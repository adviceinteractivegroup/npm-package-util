'use strict';
// ============================================================================
// Request Hours
// ============================================================================

/** Success: Basic format */
const basicHours = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '19:00'
    }
  ]
}

/** Error: The open and close are the same */
const sameOpenAndCloseTime = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '08:00'
    }
  ]
}

/** Success: Only if both are "00:00" is success */
const allDayHours = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '00:00',
      closeDay: 'MONDAY',
      closeTime: '00:00'
    }
  ]
}

/** Error: Time wrong format */
const basicHoursWrongTimeFormat = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '28:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '19:99'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '19:00'
    }
  ]
}

/** Error: Basic format */
const incompleteRangeObject = {
  periods: [{
      openDay: 'MONDAY',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    },
    {
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    }
  ]
}

/** Error: In thursday the closeTime is higher than openTime */
const basicHoursCloseDayLower = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '19:00',
      closeDay: 'THURSDAY',
      closeTime: '08:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '19:00'
    }
  ]
}

/** Success: Multiple Hours */
const multipleHours = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'MONDAY',
      openTime: '11:00',
      closeDay: 'MONDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'MONDAY',
      openTime: '17:00',
      closeDay: 'MONDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '11:00',
      closeDay: 'TUESDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '17:00',
      closeDay: 'TUESDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '11:00',
      closeDay: 'WEDNESDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '17:00',
      closeDay: 'WEDNESDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '11:00',
      closeDay: 'THURSDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '17:00',
      closeDay: 'THURSDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '11:00',
      closeDay: 'FRIDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '17:00',
      closeDay: 'FRIDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '11:00',
      closeDay: 'SATURDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '17:00',
      closeDay: 'SATURDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '11:00',
      closeDay: 'SUNDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '17:00',
      closeDay: 'SUNDAY',
      closeTime: '22:00'
    }
  ]
}

/** Error: -- Wednesday has overlaped times */
const multipleHoursOverlapedWednesday = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'MONDAY',
      openTime: '11:00',
      closeDay: 'MONDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'MONDAY',
      openTime: '17:00',
      closeDay: 'MONDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '11:00',
      closeDay: 'TUESDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '17:00',
      closeDay: 'TUESDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '10:00',
      closeDay: 'WEDNESDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '15:00',
      closeDay: 'WEDNESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '11:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '11:00',
      closeDay: 'THURSDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '17:00',
      closeDay: 'THURSDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '11:00',
      closeDay: 'FRIDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '17:00',
      closeDay: 'FRIDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '11:00',
      closeDay: 'SATURDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '17:00',
      closeDay: 'SATURDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '10:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '11:00',
      closeDay: 'SUNDAY',
      closeTime: '13:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '17:00',
      closeDay: 'SUNDAY',
      closeTime: '22:00'
    }
  ]
}

/** Error: WEDNESDAYy label is wrong */
const invalidOpenDayLabelHours = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAYy',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'FTIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '19:00'
    }
  ]
}

/** Error: FRIDAY label is wrong */
const invalidCloseDayLabelHours = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FTIDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '19:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '19:00'
    }
  ]
}

/** Error: Doen't have "periods" var */
const invalidFormat = [
  {
    openDay: 'MONDAY',
    openTime: '08:00',
    closeDay: 'MONDAY',
    closeTime: '19:00'
  },
  {
    openDay: 'TUESDAY',
    openTime: '08:00',
    closeDay: 'TUESDAY',
    closeTime: '19:00'
  }, {
    openDay: 'WEDNESDAY',
    openTime: '08:00',
    closeDay: 'WEDNESDAY',
    closeTime: '19:00'
  }, {
    openDay: 'THURSDAY',
    openTime: '08:00',
    closeDay: 'THURSDAY',
    closeTime: '19:00'
  }, {
    openDay: 'FRIDAY',
    openTime: '08:00',
    closeDay: 'FRIDAY',
    closeTime: '19:00'
  }, {
    openDay: 'SATURDAY',
    openTime: '08:00',
    closeDay: 'SATURDAY',
    closeTime: '19:00'
  }, {
    openDay: 'SUNDAY',
    openTime: '08:00',
    closeDay: 'SUNDAY',
    closeTime: '19:00'
  }
]

/** Periods Array is empty */
const emptyHours = {
  periods: []
}
// ============================================================================
// Response Hours
// ============================================================================

const reponseMultipleNotSplited = {
  periods: [{
      openDay: 'MONDAY',
      openTime: '08:00',
      closeDay: 'MONDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'TUESDAY',
      openTime: '08:00',
      closeDay: 'TUESDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'WEDNESDAY',
      openTime: '08:00',
      closeDay: 'WEDNESDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'THURSDAY',
      openTime: '08:00',
      closeDay: 'THURSDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'FRIDAY',
      openTime: '08:00',
      closeDay: 'FRIDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'SATURDAY',
      openTime: '08:00',
      closeDay: 'SATURDAY',
      closeTime: '22:00'
    },
    {
      openDay: 'SUNDAY',
      openTime: '08:00',
      closeDay: 'SUNDAY',
      closeTime: '22:00'
    }
  ]
}

module.exports = {
  basicHours,
  sameOpenAndCloseTime,
  allDayHours,
  basicHoursWrongTimeFormat,
  incompleteRangeObject,
  basicHoursCloseDayLower,
  multipleHours,
  multipleHoursOverlapedWednesday,
  invalidOpenDayLabelHours,
  invalidCloseDayLabelHours,
  invalidFormat,
  reponseMultipleNotSplited,
  emptyHours
}
