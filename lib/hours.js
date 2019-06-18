'use strict';
const _ = require('lodash');

/** Overlap Validation  */
const getOverlapValidation = (dayHours) => {
  if (dayHours.length === 1) {
    if (dayHours[0].openTime > dayHours[0].closeTime) {
      return {
        isValid: false,
        error: `${dayHours[0].openDay}: The openTime ${dayHours[0].openTime} must not be higher than closeTime ${dayHours[0].closeTime}`
      };
    }
  }

  for (let i = 0; i < dayHours.length; i++) {
    const currentRange = dayHours[i];
    for (let j = i + 1; j < dayHours.length; j++) {
      const nextRange = dayHours[j];

      if (currentRange.openTime > nextRange.openTime && currentRange.openTime < nextRange.closeTime) {
        return {
          isValid: false,
          error: `${currentRange.openDay}: ${currentRange.openTime} is between (${nextRange.openTime} - ${nextRange.closeTime}) range`
        };
      }

      if (currentRange.closeTime > nextRange.openTime && currentRange.closeTime < nextRange.closeTime) {
        return {
          isValid: false,
          error: `${currentRange.openDay}: ${currentRange.closeTime} is between (${nextRange.openTime} - ${nextRange.closeTime}) range`
        };
      }
    }
  }

  return {
    isValid: true
  };
};

/** Hours VAlidation */
const getHoursValidation = (hours) => {
  if (!hours || !hours.periods) {
    return {
      isValid: false,
      error: 'Hours format Invalid'
    };
  }

  /** Validate name of Days */
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  for (const item of hours.periods) {
    if (days.indexOf(item.openDay.toUpperCase()) === -1) {
      return {
        isValid: false,
        error: `The open Day ${item.openDay} is invalid`
      };
    }
    if (days.indexOf(item.closeDay.toUpperCase()) === -1) {
      return {
        isValid: false,
        error: `The open Day ${item.closeDay} is invalid`
      };
    }
  }

  const groupedHours = Object.values(_.groupBy(hours.periods, 'openDay'));
  for (const day of groupedHours) {
    const status = getOverlapValidation(day);
    if (status.isValid === false) {
      return status;
    }
  }

  return {
    isValid: true
  };
};

/** return the hours formated */
const getDirectoryhoursFormat = (hours) => {
  const hoursGrouped = Object.values(_.groupBy(hours.periods, 'openDay'));
  const newHours = [];

  for (const item of hoursGrouped) {
    newHours.push({
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
