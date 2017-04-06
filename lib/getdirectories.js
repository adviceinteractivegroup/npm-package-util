'use strict';
const _ = require('lodash');
const Promise = require('bluebird');

const getDirectories = Promise.promisify(function getDirectoriesPromise(rows, done) {
  if(!rows || !Array.isArray(rows) || rows.length === 0) {
    return done('No directories to filter');
  }
  let directories = rows.map(function getDirectoriesMap(rowItem) {
    return rowItem.directory;
  });
  directories = _.uniq(directories);
  
  return done(null, {rows, directories});
});

exports = module.exports = getDirectories;
