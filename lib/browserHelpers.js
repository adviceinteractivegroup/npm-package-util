'use strict';

const getUserAgent = (number = null) => {
  let userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0',
    'Mozilla/5.0 (Windows NT 5.1; rv:15.0) Gecko/20100101 Firefox/15.0.1'
  ];
  if(number && Number.isInteger(number) && number < userAgents.length && number > 0) {
    return userAgents[number];
  }
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const getReferer = () => {
  let randRefA = ['alpha', 'beta', 'gamma', 'water', 'cloud', 'image', 'if', 
    'not', 'what', 'my', 'your', 'our', 'their', 'ironic', 'alpha'];
  let randRefB = ['dog', 'cat', 'pragma', 'color', 'sound', 'imagination', 'dream', 
    'related', 'passion', 'date', 'dating', 'year', 'vault', 'directory', 'google'];
  return 'http://' + randRefA[Math.floor(Math.random() * randRefA.length)] + randRefB[Math.floor(Math.random() * randRefB.length)] + '.com';
};

exports = module.exports = {
  getUserAgent,
  getReferer
};
