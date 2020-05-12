const stdRuleConstant = {
  UPDATE_TABLE_DATA: "UPDATE_TABLE_DATA",
  UPDATE_ACTION_TYPE: "UPDATE_ACTION_TYPE",
  UPDATE_STD_RULE_NAME: "UPDATE_STD_RULE_NAME",
  UPDATE_CELL_DATA: "UPDATE_CELL_DATA",
  UPDATE_ROW_COPIED: "UPDATE_ROW_COPIED",
  UPDATE_DATA_COPIED: "UPDATE_DATA_COPIED",
  UPDATE_ARR_TO_PASTE: "UPDATE_ARR_TO_PASTE",
  UPDATE_MULTI_ARR_TO_PASTE: "UPDATE_MULTI_ARR_TO_PASTE",
  PASTE_TO_ROWS: "PASTE_TO_ROWS",
  RESET_COPY_PASTE: "RESET_COPY_PASTE",
  UPDATE_TABLE_BY_REPORT_PERIOD: "UPDATE_TABLE_BY_REPORT_PERIOD",
  CHANGE_REPORT_PERIOD: "CHANGE_REPORT_PERIOD",
  CHANGE_CONVERSION_TYPE: "CHANGE_CONVERSION_TYPE",
  UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
  RESET_CONVERSION_TYPE_DEFAULT: "RESET_CONVERSION_TYPE_DEFAULT",
  RESET_SEARCH_TEXT: "RESET_SEARCH_TEXT",
  RESET_TABLE_DATA: "RESET_TABLE_DATA",
  mappingColToComparable: {
    'FACEBOOK': {
      mappingCol: {
        STD_AD_OFF: [
        {col: "adSetId", triggerComparable: "AD_SET_ID", isRequired: true},
        {col: "referenceDay", triggerComparable: "REFERENCE_DAY", isRequired: true},
        {col: "targetCPA", triggerComparable: "TARGET_CPA", isRequired: true},
        {col: "isConversion", triggerComparable: "IS_CONVERSION", isRequired: true},
        {col: "conversionType", triggerComparable: "CONVERSION_TYPE", isRequired: true}
        ]},
      mappingInfo: {field: "adSetId", mappingField: "id"},
      leftSideTableCols: [
        {field: "campaignName", mappingField: "campaignName"},
        {field: "adSetName", mappingField: "name"}
      ]
    },
    'TWITTER': {
      mappingCol: {
        STD_ADFMT_BID: [
          {col: "adGroupId", triggerComparable: "AD_GROUP_ID", isRequired: true},
          {col: "referenceDay", triggerComparable: "REFERENCE_DAY", isRequired: true},
          {col: "targetCPA", triggerComparable: "TARGET_CPA", isRequired: true},
          {col: "maxBid", triggerComparable: "MAX_BID", isRequired: false},
          {col: "minBid", triggerComparable: "MIN_BID", isRequired: false}
        ],
        STD_AD_OFF: [
          {col: "adGroupId", triggerComparable: "AD_GROUP_ID", isRequired: true},
          {col: "referenceDay", triggerComparable: "REFERENCE_DAY", isRequired: true},
          {col: "targetCPA", triggerComparable: "TARGET_CPA", isRequired: true},
          {col: "minimumAdNumber", triggerComparable: "MINIMUM_AD_NUMBER", isRequired: true},
        ]
      },
      mappingInfo: {field: "adGroupId", mappingField: "adGroupId"},
      leftSideTableCols: [
        {field: "adGroupName", mappingField: "adGroupName"},
        {field: "cost", mappingField: "cost"},
        {field: "cpa", mappingField: "cpa"}
      ]
    },
    'NEW LINE': {
      mappingCol: {
        STD_AD_OFF: [
          {col: "adGroupId", triggerComparable: "AD_GROUP_ID", isRequired: true},
          {col: "referenceDay", triggerComparable: "REFERENCE_DAY", isRequired: true},
          {col: "targetCPA", triggerComparable: "TARGET_CPA", isRequired: true},
          {col: "minimumAdNumber", triggerComparable: "MINIMUM_AD_NUMBER", isRequired: true},
        ]
      },
      mappingInfo: {field: "adGroupId", mappingField: "adGroupId"},
      leftSideTableCols: [
        {field: "adGroupName", mappingField: "adGroupName"},
        {field: "cost", mappingField: "cost"},
        {field: "cpaInstall", mappingField: "cpaInstall"},
        {field: "cpaCV", mappingField: "cpaCV"}
      ]
    }
  },
  STD_TRIGGER_MAPPING: {
    'TWITTER': {
      COMMON_TRIGGER: ['REFERENCE_DAY', 'TARGET_CPA'],
      MAPPING_TRIGGER: ['AD_GROUP_ID'],
    }
  },
  ACTIONS: {
    'TWITTER': {
      STD_ADFMT_BID: {
        NAME: "STD_ADFMT_BID",
        REQUIRE_COLS: ["referenceDay", "targetCPA"],
        COPIED_KEYS: ["referenceDay", "targetCPA", "maxBid", "minBid"],
        COLUMNS: ['AD_GROUP_ID', 'REFERENCE_DAY', 'TARGET_CPA', 'MAX_BID', 'MIN_BID']
      },
      STD_AD_OFF: {
        NAME: "STD_AD_OFF",
        REQUIRE_COLS: ["referenceDay", "targetCPA", "minimumAdNumber"],
        COPIED_KEYS: ["referenceDay", "targetCPA", "minimumAdNumber"],
        COLUMNS: ['AD_GROUP_ID', 'REFERENCE_DAY', 'TARGET_CPA', 'MINIMUM_AD_NUMBER']
      }
    },
    'FACEBOOK': {
      STD_AD_OFF: {
        NAME: "STD_AD_OFF",
        REQUIRE_COLS: ["referenceDay", "targetCPA", "isConversion", "conversionType"],
        COPIED_KEYS: ['isConversion', 'referenceDay', 'conversionType', 'targetCPA']
      }
    },
    'NEW LINE': {
      STD_AD_OFF: {
        NAME: "STD_AD_OFF",
        REQUIRE_COLS: ["referenceDay", "targetCPA", "minimumAdNumber"],
        COPIED_KEYS: ["referenceDay", "targetCPA", "minimumAdNumber"]
      }
    }
  },
  TRIGGERS_LEVEL: {
    FACEBOOK: "ADSET",
    TWITTER: "ADGROUP",
    'NEW LINE': "ADGROUP"
  },
  STD_RULE_ACTIONS: ["STD_ADFMT_BID", "STD_AD_OFF", "STD_CVR_AD_OFF", "STD_AD_ON", "STD_AD_BID"]
}

export default stdRuleConstant
