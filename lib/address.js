'use strict';

const getAbreviatedState = state => {
  const allAbrStates = {
    'AA': 'armed forces americas (except canada)',
    'AE': 'armed forces europe, middle east, africa, and canada',
    'AK': 'alaska',
    'AL': 'alabama',
    'AP': 'armed forces pacific',
    'AR': 'arkansas',
    'AS': 'american samoa',
    'AZ': 'arizona',
    'CA': 'california',
    'CO': 'colorado',
    'CT': 'connecticut',
    'DC': 'district of columbia',
    'DE': 'delaware',
    'FL': 'florida',
    'FM': 'federated states of micronesia',
    'GA': 'georgia',
    'GU': 'guam',
    'HI': 'hawaii',
    'IA': 'iowa',
    'ID': 'idaho',
    'IL': 'illinois',
    'IN': 'indiana',
    'KS': 'kansas',
    'KY': 'kentucky',
    'LA': 'louisiana',
    'MA': 'massachusetts',
    'MD': 'maryland',
    'ME': 'maine',
    'MH': 'marshall islands',
    'MI': 'michigan',
    'MN': 'minnesota',
    'MO': 'missouri',
    'MP': 'northern mariana islands',
    'MS': 'mississippi',
    'MT': 'montana',
    'NC': 'north carolina',
    'ND': 'north dakota',
    'NE': 'nebraska',
    'NH': 'new hampshire',
    'NJ': 'new jersey',
    'NM': 'new mexico',
    'NV': 'nevada',
    'NY': 'new york',
    'OH': 'ohio',
    'OK': 'oklahoma',
    'OR': 'oregon',
    'PA': 'pennsylvania',
    'PR': 'puerto rico',
    'PW': 'palau',
    'RI': 'rhode island',
    'SC': 'south carolina',
    'SD': 'south dakota',
    'TN': 'tennessee',
    'TX': 'texas',
    'UT': 'utah',
    'VA': 'virginia',
    'VI': 'virgin islands',
    'VT': 'vermont',
    'WA': 'washington',
    'WI': 'wisconsin',
    'WV': 'west virginia',
    'WY': 'wyomin'
  };
  let abrState = state;
  for (const key in allAbrStates) {
    if(allAbrStates[key] === state.toLowerCase()) {
      abrState = key;
      break;
    } else if(key === state.toUpperCase()) {
      abrState = key;
      break;
    }
  }
  return abrState;
};

const normalizeSuite = street => {
  return street
  .replace(/((\bbuilding\b)|(\bapartment\b)|(\bapt\b)|(\bbldg\b)|(\bsuite\b)|(\bste\b)|(\bdepartment\b)|(\bdept\b))[\.]?/gi, '#')
  .replace(/\s+/g, ' ')
  .trim();
};

exports = module.exports = {
  getAbreviatedState,
  normalizeSuite
};
