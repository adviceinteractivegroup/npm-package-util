'use strict';
const asyncLoop = require('node-async-loop');
const {getAddressScore} = require('./addressScore');
const {getPhoneScore} = require('./phoneScore');
const {parseAddress} = require('./address');
const sorensen = require('./sorensen');
const {filterStopWords} = require('./businessName');
const levenshtein = require('./levenshtein');

const calculateBusinessScores = (client, parsedClientAddr, directory) => {
  if(!directory || !directory.parseAddress || !parsedClientAddr || !client
  || !directory.phone || !directory.name || !client.phone || !client.businessName) {
    return null;
  }
  directory.addrScore = getAddressScore(parsedClientAddr, directory.parseAddress);
  directory.phoneScore = getPhoneScore(client.phone, directory.phone);
  directory.nameSorensenScore = sorensen(
    filterStopWords(client.businessName.toLowerCase()), 
    filterStopWords(directory.name.decodeURLpart().toLowerCase()).encodeURLpart(' '));
  directory.nameLevenshteinScore = levenshtein(
    filterStopWords(client.businessName.toLowerCase()), 
    filterStopWords(directory.name.decodeURLpart().toLowerCase()).encodeURLpart(' '));
  return directory;
};

const setParseDirectoriesAddress = (directoriesArray) => {
  return new Promise((resolve, reject) => {
    let directories = [];
    asyncLoop(directoriesArray, function something(directory, next) {//loop execute asynchronous each element
      parseAddress(directory.address)
      .then(address => {
        directory.parseAddress = address;
        directories.push(directory);// add parseAddress element into the objet
        next();
      })
      .catch(err => {
        reject(err);
      });
    }, function error(err) {
      if (err) {
        reject(err);
      }
      resolve(directories);
    });
  });
};

const getBestResult = (scores, query) => {
  let bestScore = null;
  let results = scores.filter(business => {
    if (business.nameSorensenScore >= 0.65 && business.nameLevenshteinScore < 8) {
      return business;
    }
  });
  
  results.forEach(business => {
    business.totalScore = (business.addrScore * 1.8 + business.phoneScore + business.nameSorensenScore) / 3;
  });

  if(results.length > 0) {
    bestScore = results[0];
    results.forEach(business => {
      if(business.totalScore > bestScore.totalScore) {
        bestScore = business;
      }
    });
  } else if(results.length === 0) {
    results = scores.filter(business => {
      if (business.nameSorensenScore >= 0.75) {
        return business;
      }
    });
    if(results.length > 0) {
      bestScore = results[0];
      results.forEach(business => {
        if(business.nameLevenshteinScore < bestScore.nameLevenshteinScore) {
          bestScore = business;
        }
      });
    }
  }

  if(bestScore) {
    delete bestScore.query;
    delete bestScore.nameSorensenScore;
    delete bestScore.nameLevenshteinScore;
    delete bestScore.addrScore;
    delete bestScore.phoneScore;
    delete bestScore.totalScore;
    delete bestScore.parseAddress;

    return {
      message: 'OK', 
      results: true,
      query,
      result: [bestScore]
    };
  } else {
    return {error: {message: 'not found'}, results: false, query};
  }
};

const frontier = data => {
  let client = data.client;
  let resultsArray = data.resultsArray;
  let query = data.error ? data.error.query : data.resultsArray[0].query;
  
  return new Promise((resolve, reject) => {
    let parsedClientAddr = {};
    if(data && data.error) {
      resolve(data);
    }
    //Parse address data client
    parseAddress(`${client.street1}${client.street2}, ${client.city}, ${client.state}, ${client.postal}`)
      .then(result => {
        parsedClientAddr = result;
        return setParseDirectoriesAddress(resultsArray);//Parse address to directories results
      })
      .then( arrayAdresses => {
        let scores = arrayAdresses.map( directory => {
          return calculateBusinessScores(client, parsedClientAddr, directory);//Calculate Address Score, Phone Score and Name Score
        }).filter(Boolean);
        return Promise.resolve(scores);
      })
      .then(scores => {
        let bestResult = getBestResult(scores, query);
        if(bestResult) {
          resolve(bestResult);
        } else{
          reject({});
        }
      })
      .catch(error => {
        return reject(error);
      });
  });
};

exports = module.exports = {
  frontier,
  calculateBusinessScores,
  setParseDirectoriesAddress,
  getBestResult
};
