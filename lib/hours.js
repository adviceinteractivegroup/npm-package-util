'use strict';
const _ = require('lodash');

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

/** Hours Validation */
const getHoursValidation = (hours) => {
  let isValid;
  let errors = '';
  if (!hours || !hours.periods || hours.periods.length < 1) {
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
  const groupedHours = Object.values(_.groupBy(hours.periods, 'openDay'));
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
  const hoursGrouped = Object.values(_.groupBy(hours.periods, 'openDay'));
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
  return new Promise((resolve, reject) => {
    if (!directory) {
      reject('directory is required');
    }

    const status = getHoursValidation(hours);
    if (status.isValid === false) {
      reject(status.error);
    } else {
      /** Just make sure that all day labels are in Upper case */
      hours.periods = hours.periods.map((item) => {
        return {
          openDay: item.openDay.toUpperCase(),
          openTime: item.openTime,
          closeDay: item.closeDay.toUpperCase(),
          closeTime: item.closeTime
        };
      });

      if (directory === 'google') {
        resolve(hours);
      } else {
        /** TODO: check the others directories format */
        const newHours = getDirectoryhoursFormat(hours);
        resolve(newHours);
      }
    }
  });
};

module.exports = {
  getHours
};
