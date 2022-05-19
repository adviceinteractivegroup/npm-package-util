'use strict';
const asyncLoop = require('node-async-loop');
const { getAddressScore } = require('./addressScore');
const { getPhoneScore } = require('./phoneScore');
const { parseAddress } = require('./address');
const sorensen = require('./sorensen');
const { filterStopWords } = require('./businessName');
const levenshtein = require('./levenshtein');

const calculateBusinessScores = (client, parsedClientAddr, directory) => {
  if (!directory || !directory.parseAddress || !parsedClientAddr || !client
    || !directory.phone || !directory.name || !client.phone || !client.businessName) {
    return null;
  }
  parsedClientAddr.hide = client.hide;
  directory.addrScore = getAddressScore(parsedClientAddr, directory.parseAddress);
  directory.phoneScore = getPhoneScore(client.phone, directory.phone);
  directory.nameSorensenScore = sorensen(
    filterStopWords(client.businessName.decodeURLpart().toLowerCase()),
    filterStopWords(directory.name.decodeURLpart().toLowerCase()).replace(/\s+/g, ' ').trim());
  directory.nameLevenshteinScore = levenshtein(
    filterStopWords(client.businessName.decodeURLpart().toLowerCase()),
    filterStopWords(directory.name.decodeURLpart().toLowerCase()).replace(/\s+/g, ' ').trim());
  return directory;
};

const parseDirectoryBusinessesAddress = (businessesArray) => {
  return new Promise((resolve, reject) => {
    let businesses = [];
    asyncLoop(businessesArray, (result, next) => {//loop execute asynchronous each element
      parseAddress(result.address)
        .then(address => {
          result.parseAddress = address;
          businesses.push(result);// add parseAddress element into the objet
          next();
        })
        .catch(err => {
          reject(err);
        });
    }, (err) => {
      if (err) {
        reject(err);
      }
      resolve(businesses);
    });
  });
};

const getBestResult = ({ scores, query, client }) => {
  let bestScore = null;
  let results = scores.filter(business => {
    if ((business.nameSorensenScore >= 0.55 || business.nameLevenshteinScore < 10) && business.phoneScore === 1 ||
    (business.nameSorensenScore >= 0.55 || business.nameLevenshteinScore < 5) ||
      (business.nameSorensenScore >= 0.52 || business.nameLevenshteinScore < 10) && business.addrScore >= 0.95 ||
      (business.nameSorensenScore >= 0.58 || business.nameLevenshteinScore < 10) && business.addrScore >= 0.85 ||
      business.nameSorensenScore >= 0.7 && business.nameLevenshteinScore < 6 ||
      business.phoneScore === 1 && business.addrScore > 0.95) {
      return business;
      // if (business.nameSorensenScore >= 0.65 && business.nameLevenshteinScore < 8) {
      //   return business;
    }
  });

  results.forEach(business => {
    if (client.hide) {
      business.totalScore = (business.phoneScore * 0.6 + business.addrScore + business.nameSorensenScore * 1.4) / 3;
    } else {
      business.totalScore = (business.addrScore * 1.8 + business.phoneScore + business.nameSorensenScore) / 3;
    }
  });

  if (results.length > 0) {
    bestScore = results[0];
    results.forEach(business => {
      if (business.totalScore > bestScore.totalScore) {
        bestScore = business;
      }
    });
  }
  //  else if(results.length === 0) {
  //   results = scores.filter(business => {
  //     if (business.nameSorensenScore >= 0.75) {
  //       return business;
  //     }
  //   });
  //   if(results.length > 0) {
  //     bestScore = results[0];
  //     results.forEach(business => {
  //       if(business.nameLevenshteinScore < bestScore.nameLevenshteinScore) {
  //         bestScore = business;
  //       }
  //     });
  //   }
  // }

  if (bestScore) {
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
    return { error: { message: 'not found' }, results: false, query };
  }
};

const frontier = data => {
  let client = data.client;
  let resultsArray = data.resultsArray;
  let query = '';
  if (data.error) {
    query = data.error.query;
  } else if (resultsArray.length > 0) {
    query = resultsArray[0].query;
  }
  return new Promise((resolve, reject) => {
    let parsedClientAddr = {};
    if (data && data.error) {
      resolve(data);
    }
    if (!resultsArray.length) {
      resolve({ error: { message: 'not found' } });
    }

    //Parse address data client
    parseAddress(`${client.street1}${client.street2}, ${client.city}, ${client.state}, ${client.postal}`)
      .then(result => {
        parsedClientAddr = result;
        return parseDirectoryBusinessesAddress(resultsArray);//Parse address to directories results
      })
      .then(parsedResults => {
        // filter out parsed results that do not match zipcode
        let filteredParsedResults = [];
        parsedResults.forEach(result => {
          if (`${client.postal}` === `${result.parseAddress.postal_code}`) {
            filteredParsedResults.push(result);
          } else if (!result.parseAddress || !result.parseAddress.postal_code) {
            filteredParsedResults.push(result);
          }
        });
        parsedResults = filteredParsedResults;

        let directoryBusiness = parsedResults.map(directory => {
          return calculateBusinessScores(client, parsedClientAddr, directory);//Calculate Address Score, Phone Score and Name Score
        }).filter(Boolean);
        return Promise.resolve(directoryBusiness);
      })
      .then(directoryBusiness => {
        // console.log(directoryBusiness);
        let bestResult = getBestResult({ scores: directoryBusiness, query, client });
        if (bestResult) {
          resolve(bestResult);
        } else {
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
  parseDirectoryBusinessesAddress,
  getBestResult
};
