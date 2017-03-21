'use strict';
const str_replace = require('locutus/php/strings/str_replace');
const utf8_decode = require('locutus/php/xml/utf8_decode');
const explode = require('locutus/php/strings/explode');
const strpos = require('locutus/php/strings/strpos');
const implode = require('locutus/php/strings/implode');
const similar_text = require('locutus/php/strings/similar_text');
const round = require('locutus/php/math/round');

const normalize = function normalize($string, $type, $suite_numbers) {
  $string = str_replace('&amp;', '', $string);
  
  $string = utf8_decode($string);
  $string = str_replace(',', ' , ', $string);
  $string = $string.replace('/\s{2,}/', ' '); // duda
  $string = $string.trim();
  $string = str_replace(' , ', ', ', $string);
  $string = $string.trim();
  let $preserve = $string;
  
  let countries_check = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegowina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, the Democratic Republic of the',
    'Cook Islands',
    'Costa Rica',
    "Cote d'Ivoire",
    'Croatia (Hrvatska)',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'France Metropolitan',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Giorgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard and Mc Donald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea, Democratic People's Republic of",
    'Korea, Republic of',
    'Kuwait',
    'Kyrgyzstan',
    "Lao, People's Democratic Republic",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia, The Former Yugoslav Republic of',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova, Republic of',
    'Monaco',
    'Mongolia',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia (Slovak Republic)',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'Spain',
    'Sri Lanka',
    'St. Helena',
    'St. Pierre and Miquelon',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen Islands',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan, Province of China',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'USA',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna Islands',
    'Western Sahara',
    'Yemen',
    'Yugoslavia',
    'Zambia',
    'Zimbabwe'
  ];
  
  let states_check = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  };
  
  let replacing = [];
  let compass = {search: [], replace: []};
  
  if ($type === 'business') {
    //echo "Setting up Business filters...\n";
    replacing = ['llc', 'co', 'ltd', 'inc', 'llcs', 'llp', 'llps', 'and', '&', '#'];
  } else {
    //echo "Setting up Address filters...\n";
    //echo "Type: $type\n";
    if ($type !== 'phone') {
      //console.log('$type', $type);
      //console.log('if type != phone, debo pasar por aca');
      
      if ($suite_numbers === false) {
        //console.log('$suite_numbers', $suite_numbers);
        //console.log('if $suite_numbers == false, debo pasar por aca');
        
        //echo "Stripping now Suite Numbers...\n";
        let $suite_identifier = [
          //'unit',
          'building',
          'apartment',
          'apt',
          'bldg',
          'suite',
          'ste',
          'department',
          'dept'
        ];
        let $string_strip = $string.toLowerCase();
        let $identifier = '#';
        
        //console.log('$string_strip1', $string_strip);
        
        $suite_identifier.forEach(function suiteIdentifierForEach($right_identifier) {
          $string_strip = $string_strip.replace(/\b$right_identifier\b/, $identifier);
          //console.log('$string_strip2', $string_strip, $right_identifier);
          $string_strip = $string_strip.replace($right_identifier, $identifier);
        });
        
        //console.log('$string_strip2', $string_strip);
        
        let $test = explode($identifier, $string_strip, 2);
        
        if ($test && $test[1]) {
          $test[1] = $test[1].trim();
          let $test_suite = explode(' ', $test[1]);
          //echo "\n".count($test_suite)."\n";
          if ($test_suite.length > 1) {
            //print_r($test_suite);
            delete $test_suite[0];
            $test[1] = implode(' ', $test_suite);
          }
          $test = str_replace('  ', ' ', implode(' ', $test));
          $string = $test;
        }
        //print_r($test);
      }
      
      let $temporary = explode(' ', $string);
      let $count_temporary = $temporary.length - 1;
      
      if (strpos($temporary[$count_temporary], '-') !== false) {
        let $parts = explode('-', $temporary[$count_temporary]);
        $temporary[$count_temporary] = $parts[0];
        $string = implode(' ', $temporary);
        //echo "\nFinalized String: $string\n";
      }
    }
    
    compass.search = [
      'north east',
      'north west',
      'south east',
      'south west',
      'north',
      'east',
      'west',
      'south',
      'northeast',
      'northwest',
      'southeast',
      'southwest',
      'ne',
      'nw',
      'se',
      'sw',
      'n',
      'e',
      'w',
      's',
      'ne',
      'nw',
      'se',
      'sw'
    ];
    
    compass.replace = [
      'n e',
      'n w',
      's e',
      's w',
      'n',
      'e',
      'w',
      's',
      'n e',
      'n w',
      's e',
      's w',
      'n e',
      'n w',
      's e',
      's w',
      'n',
      'e',
      'w',
      's',
      'n e',
      'n w',
      's e',
      's w'
    ];
    
    //console.log("compass1", compass);
    
    replacing = [
      'ALY',
      'ALLEY',
      'ANX',
      'ANNEX',
      'APT',
      'APARTMENT',
      'ARC',
      'ARCADE',
      'AVE',
      'AVENUE',
      'BSMT',
      'BASEMENT',
      'BYU',
      'BAYOU',
      'BCH',
      'BEACH',
      'BND',
      'BEND',
      'BLF',
      'BLUFF',
      'BTM',
      'BOTTOM',
      'BLVD',
      'BOULEVARD',
      'BR',
      'BRANCH',
      'BRG',
      'BRIDGE',
      'BRK',
      'BROOK',
      'BLDG',
      'BUILDING',
      'BG',
      'BURG',
      'BYP',
      'BYPASS',
      'CP',
      'CAMP',
      'CYN',
      'CANYON',
      'CPE',
      'CAPE',
      'CSWY',
      'CAUSEWAY',
      'CTR',
      'CENTER',
      'CIR',
      'CIRCLE',
      'CLFS',
      'CLIFF',
      'CLFS',
      'CLIFFS',
      'CLB',
      'CLUB',
      'COR',
      'CORNER',
      'CORS',
      'CORNERS',
      'CRSE',
      'COURSE',
      'CT',
      'COURT',
      'CTS',
      'COURTS',
      'CV',
      'COVE',
      'CRK',
      'CREEK',
      'CRES',
      'CRESCENT',
      'XING',
      'CROSSING',
      'DL',
      'DALE',
      'DM',
      'DAM',
      'DEPT',
      'DEPARTMENT',
      'DV',
      'DIVIDE',
      'DR',
      'DRIVE',
      'EST',
      'ESTATE',
      'EXPY',
      'EXPRESSWAY',
      'EXT',
      'EXTENSION',
      'FLS',
      'FALLS',
      'FRY',
      'FERRY',
      'FLD',
      'FIELD',
      'FLDS',
      'FIELDS',
      'FLT',
      'FLAT',
      'FL',
      'FLOOR',
      'LOOP',
      'LP',
      'FRD',
      'FORD',
      'FRST',
      'FOREST',
      'FRG',
      'FORGE',
      'FRK',
      'FORK',
      'FRKS',
      'FORKS',
      'FT',
      'FORT',
      'FWY',
      'FREEWAY',
      'FRNT',
      'FRONT',
      'GDNS',
      'GARDEN',
      'GDNS',
      'GARDENS',
      'GTWY',
      'GATEWAY',
      'GLN',
      'GLEN',
      'GRN',
      'GREEN',
      'GRV',
      'GROVE',
      'HNGR',
      'HANGER',
      'HBR',
      'HARBOR',
      'HVN',
      'HAVEN',
      'HTS',
      'HEIGHTS',
      'HWY',
      'HIGHWAY',
      'HL',
      'HILL',
      'HLS',
      'HILLS',
      'HOLW',
      'HOLLOW',
      'INLT',
      'INLET',
      'IS',
      'ISLAND',
      'ISS',
      'ISLANDS',
      'JCT',
      'JUNCTION',
      'KY',
      'KEY',
      'KNLS',
      'KNOLL',
      'KNLS',
      'KNOLLS',
      'LK',
      'LAKE',
      'LKS',
      'LAKES',
      'LNDG',
      'LANDING',
      'LN',
      'LANE',
      'LGT',
      'LIGHT',
      'LF',
      'LOAF',
      'LBBY',
      'LOBBY',
      'LCKS',
      'LOCK',
      'LCKS',
      'LOCKS',
      'LDG',
      'LODGE',
      'LOWR',
      'LOWER',
      'MNR',
      'MANOR',
      'MDWS',
      'MEADOW',
      'MDWS',
      'MEADOWS',
      'ML',
      'MILL',
      'MLS',
      'MILLS',
      'MSN',
      'MISSION',
      'MT',
      'MOUNT',
      'MTN',
      'MOUNTAIN',
      'NCK',
      'NECK',
      'OFC',
      'OFFICE',
      'ORCH',
      'ORCHARD',
      'PKWY',
      'PARKWAY',
      'PH',
      'PENTHOUSE',
      'PNES',
      'PINE',
      'PNES',
      'PINES',
      'PL',
      'PLACE',
      'PLN',
      'PLAIN',
      'PLNS',
      'PLAINS',
      'PLZ',
      'PLAZA',
      'PT',
      'POINT',
      'PRT',
      'PORT',
      'PR',
      'PRAIRIE',
      'RADL',
      'RADIAL',
      'ROUTE',
      'RNCH',
      'RANCH',
      'RPDS',
      'RAPID',
      'RPDS',
      'RAPIDS',
      'RST',
      'REST',
      'RDG',
      'RIDGE',
      'RIV',
      'RIVER',
      'RD',
      'ROAD',
      'RM',
      'ROOM',
      'SHL',
      'SHOAL',
      'SHLS',
      'SHOALS',
      'SHR',
      'SHORE',
      'SHRS',
      'SHORES',
      'SPC',
      'SPACE',
      'SPG',
      'SPRING',
      'SPGS',
      'SPRINGS',
      'SQ',
      'SQUARE',
      'STA',
      'STATION',
      'STRA',
      'STRAVENUE',
      'STRM',
      'STREAM',
      'ST',
      'STREET',
      'STE',
      'SUITE',
      'SMT',
      'SUMMIT',
      'TER',
      'TERRACE',
      'TRCE',
      'TRACE',
      'TRAK',
      'TRACK',
      'TRFY',
      'TRAFFICWAY',
      'TRL',
      'TRAIL',
      'TRLR',
      'TRAILER',
      'TUNL',
      'TUNNEL',
      'TPKE',
      'TPK',
      'TURNPIKE',
      'UNIT',
      'UN',
      'UNION',
      'UPPR',
      'UPPER',
      'VLY',
      'VALLEY',
      'VIA',
      'VIADUCT',
      'VW',
      'VIEW',
      'VLG',
      'VILLAGE',
      'VL',
      'VILLE',
      'VIS',
      'VISTA',
      'WAY',
      'WAY',
      'WLS',
      'WELL',
      'WLS',
      'WELLS'
    ];
  }
  
  //console.log("compass2", compass);
  //
  //Let's strip symbols and whatever inside the array, it all depend of what kind of normalization we are going to run.
  //We run this filter again, just in case...
  //console.log("$string1", $string);
  let replacex = $string.replace(/[^0-9a-zA-Z ]/, '');
  //console.log("replacex", replacex);
  
  let lower = replacex.toLowerCase();
  //console.log('lower', lower);
  
  let replacey = lower.replace('\n', ' ');
  //console.log('replacey', replacey);
  
  let replacez = replacey.replace(/\s{2,}/, ' ');
  //console.log('replacez', replacez);
  
  let $final_string = replacez.trim();
  //console.log('$final_string1', $final_string);
  
  if ($type !== 'business') {
    //console.log('$type', $type);
    //console.log('if $type !=business debo pasar por aca');
    
    $final_string = $final_string.replace('court', 'ct');
    //console.log('$final_string2', $final_string);
    //Let's Abbreviate Compass Directions... Like, southeast to se...
    
    compass.search.forEach(function compassSearchForEach($compass_search, $compass_id) {
      $compass_search = $compass_search.toLowerCase();
      $final_string = $final_string.replace($compass_search, compass.replace[$compass_id].toLowerCase());
    });
    
    //console.log('$final_string3', $final_string);
    
    countries_check.forEach(function countriesCheckForEach($country_delete) {
      $country_delete = $country_delete.toLowerCase();
      $country_delete = $country_delete.trim();
      $final_string = $final_string.replace($country_delete, '');
    });
    
    //console.log('$final_string4', $final_string);
    
    for(let $state_id in states_check) {
      if($state_id) {
        let $state_expand = states_check[$state_id];
        $state_id = $state_id.toLowerCase();
        $state_expand = $state_expand.toLowerCase();
        $final_string = $final_string.replace(` ${$state_id} `, ` ${$state_expand} `);
      }
    }
    //console.log('$final_string5', $final_string);
  }
  
  $final_string = $final_string.replace(/[^0-9a-zA-Z ]/, '');
  //console.log('$final_string6', $final_string);
  
  $final_string = $final_string.toLowerCase();
  //console.log('$final_string7', $final_string);
  
  $final_string = $final_string.replace('\n', ' ');
  //console.log('$final_string8', $final_string);
  
  $final_string = $final_string.replace(/\s{2,}/, ' ');
  //console.log('$final_string9', $final_string);
  
  $final_string = $final_string.trim();
  //console.log('$final_string10', $final_string);
  
  replacing.forEach(function processReplacingArray($replace_word ) {
    $replace_word = $replace_word.toLowerCase().trim();
    $final_string = $final_string.replace($replace_word, '');
  });
  //console.log('$final_string11', $final_string);
  
  //We run it again to remove double spaces...
  $final_string = $final_string.replace(/[^0-9a-zA-Z ]/, '');
  //console.log('$final_string12', $final_string);
  
  $final_string = $final_string.toLowerCase();
  //console.log('$final_string13', $final_string);
  
  $final_string = $final_string.replace('\n', ' ');
  //console.log('$final_string14', $final_string);
  
  
  $final_string = $final_string.replace(/\s{2,}/, ' ');
  //console.log('$final_string15', $final_string);
  
  $final_string = $final_string.trim();
  //console.log('$final_string16', $final_string);
  
  $final_string = $final_string.replace(/,/g, '');
  //console.log('$final_string17', $final_string);
  
  return {
    original: $preserve,
    final: $final_string.replace(/\s/g, ''),
    type: $type
  };
};

const verifyNapGp = function verifyNAP($array) {
  let $_a = $array.a.final;
  let $_b = $array.b.final;
  let $score = similar_text($_a, $_b, true);
  return round($score);
};

const isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isURL = function isURL(str) {
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex .test(str);
};

exports = module.exports = {
  normalize: normalize,
  verifyNapGp: verifyNapGp,
  isNumeric: isNumeric,
  isURL: isURL
};

