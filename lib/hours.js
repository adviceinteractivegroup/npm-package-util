'use strict';
const _ = require('lodash');

const areEmptyHours = (hours) => {
  // null, '', undefined
  if (!hours) {
    return true;
  }

  if (typeof hours === 'string' && hours.trim() === '') {
    return true;
  }

  // is []
  if (Array.isArray(hours) && hours.length === 0) {
    return true;
  }

  // { periods: [] }
  if (hours && hours.periods && hours.periods.length === 0) {
    return true;
  }

  if (!Object.keys(hours).length) {
    return true;
  }

  return false;
};

/** Overlap Validation  */
const getOverlapValidation = (dayHours) => {
  if (dayHours.length === 1) {
    if (dayHours[0].openTime > dayHours[0].closeTime) {
      return {
        isValid: false,
        error: `${dayHours[0].openDay}: The openTime ${dayHours[0].openTime} must not be higher than closeTime ${dayHours[0].closeTime}; `
      };
    }
  }

  for (let i = 0; i < dayHours.length; i++) {
    const currentRange = dayHours[i];
    for (let j = i + 1; j < dayHours.length; j++) {
      const nextRange = dayHours[j];

      if (currentRange.openTime >= nextRange.openTime && currentRange.openTime <= nextRange.closeTime) {
        return {
          isValid: false,
          error: `${currentRange.openDay}: ${currentRange.openTime} is between (${nextRange.openTime} - ${nextRange.closeTime}) range; `
        };
      }

      if (currentRange.closeTime >= nextRange.openTime && currentRange.closeTime <= nextRange.closeTime) {
        return {
          isValid: false,
          error: `${currentRange.openDay}: ${currentRange.closeTime} is between (${nextRange.openTime} - ${nextRange.closeTime}) range; `
        };
      }
    }
  }

  return {
    isValid: true
  };
};

/** Validate than range has [openDay, openTime, closeDay, closeTime] properties */
const getRangeObjectFormat = (range) => {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const regex = RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');

  let isValid;
  let errors = '';

  /** openDay */
  if (!range.openDay) {
    isValid = false;
    errors += '"openDay" property is missing; ';
  } else if (days.indexOf(range.openDay.toUpperCase()) === -1) {
    isValid = false;
    errors += `The openDay "${range.openDay}" is invalid; `;
  }

  /** closeDay */
  if (!range.closeDay) {
    isValid = false;
    errors += '"closeDay" property is missing; ';
  } else if (days.indexOf(range.closeDay.toUpperCase()) === -1) {
    isValid = false;
    errors += `The closeDay "${range.closeDay}" is invalid; `;
  }

  /** openTime */
  if (!range.openTime) {
    isValid = false;
    errors += '"openTime" property is missing; ';
  } else if (!regex.test(range.openTime)) {
    isValid = false;
    errors += `The openTime "${range.openTime}" has invalid format, it must be (HH:MM); `;
  }

  /** closeTime */
  if (!range.closeTime) {
    isValid = false;
    errors += '"closeTime" property is missing; ';
  } else if (!regex.test(range.closeTime)) {
    isValid = false;
    errors += `The closeTime "${range.closeTime}" has invalid format, it must be (HH:MM); `;
  }

  if (range.openDay !== range.closeDay) {
    isValid = false;
    errors += `The openDay "${range.openDay}" and closeDay "${range.closeDay}" must be equal; `;
  }

  if (range.openTime === range.closeTime) {
    /** Only open & close Time  can be equal if both are "00:00" (all day) */
    if (range.openTime !== '00:00') {
      isValid = false;
      errors += `The openTime "${range.openTime}" and closeTime "${range.closeTime}" must be different; `;
    }
  }

  if (isValid === false) {
    return {
      isValid: false,
      error: errors
    };
  } else {
    return {
      isValid: true
    };
  }
};

/**
 * @param {object} hours 
 * 
 * @typedef {Object} Validation
 * @property {boolean} isValid: true/false
 * @property {string} error: string of erros found in the validation separated by (;)
 * 
 * @returns {Validation} The validation object with status { isValid: boolean, error?: string}
 */
const getHoursValidation = (hours) => {
  let isValid;
  let errors = '';

  if (areEmptyHours(hours)) {
    return {
      isValid: true
    };
  } else if (!hours.periods) {
    return {
      isValid: false,
      error: 'Hours format Invalid'
    };
  }

  /** Validate range structure and value */
  for (const range of hours.periods) {
    const formatStatus = getRangeObjectFormat(range);
    if (formatStatus.isValid === false) {
      isValid = false;
      errors += formatStatus.error;
    }
  }

  /** Validate Overlaping */
  const groupedHours = _.values(_.groupBy(hours.periods, 'openDay'));
  for (const day of groupedHours) {
    const status = getOverlapValidation(day);
    if (status.isValid === false) {
      isValid = status.isValid;
      errors += status.error;
    }
  }

  if (isValid === false) {
    return {
      isValid: false,
      error: errors
    };
  } else {
    return {
      isValid: true
    };
  }
};

/** return the hours formated */
const getDirectoryhoursFormat = (hours) => {
  const hoursGrouped = _.values(_.groupBy(hours.periods, 'openDay'));
  const newHours = {
    periods: []
  };

  for (const item of hoursGrouped) {
    newHours.periods.push({
      openDay: item[0].openDay.toUpperCase(),
      openTime: _.orderBy(item, ['openTime'], ['asc'])[0].openTime,
      closeDay: item[0].closeDay.toUpperCase(),
      closeTime: _.orderBy(item, ['closeTime'], ['desc'])[0].closeTime
    });
  }

  return newHours;
};

const getHours = (hours, directory) => {
  if (!directory) {
    throw new Error('directory is required');
  }

  const status = getHoursValidation(hours);
  if (status.isValid === false) {
    throw new Error(status.error);
  } else {
    // allow empty hours { periods: [] }
    if (areEmptyHours(hours)) {
      return '';
    }
    /** Just make sure that all day labels are in Upper case */
    hours.periods = hours.periods.map((item) => {
      return {
        openDay: item.openDay.toUpperCase(),
        openTime: item.openTime,
        closeDay: item.closeDay.toUpperCase(),
        closeTime: item.closeTime
      };
    });

    if (['google', 'brownbook', 'apple', 'synup', 'foursquare', 'infogroup', 'localstack', 'judysbook', 'hotfrog']
      .indexOf(directory) !== -1) {
      return hours;
    } else {
      const newHours = getDirectoryhoursFormat(hours);
      return newHours;
    }
  }
};

module.exports = {
  getHours,
  getHoursValidation
};
