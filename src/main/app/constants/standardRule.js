const stdRule = {
  COLUMN_NAME: {
    AD_GROUP_NAME: "AD_GROUP_NAME",
    COST: "COST",
    CPA: "CPA",
    REFERENCE_DAY: "REFERENCE_DAY",
    REFERENCE_PERIOD: "REFERENCE_PERIOD",
    TARGET_CPA: "TARGET_CPA",
    UPPER_LIMIT: "UPPER_LIMIT",
    MINIMUM_LIMIT: "MINIMUM_LIMIT",
    MINIMUM_LIMIT_CPC: "MINIMUM_LIMIT_CPC",
    modify: "modify",
    structureCols: {
      campaignName: "campaignName",
      adSetId: "adSetId",
      adSetName: "adSetName",
    },
    reportCols: {
      adGroupName: "adGroupName",
      cost: "cost",
      cpa: "cpa"
    },
    settingItems: {
      isConversion: "isConversion",
      conversionType: "conversionType",
      referencePeriod: "referencePeriod",
      referenceDay: "referenceDay",
      targetCPA: "targetCPA",
      minimumAdNumber: "minimumAdNumber",
      maxBid: "maxBid",
      minBid: "minBid"
    }
  },
  COLUMN_NUMBER: {
    P4Y: {
      REFERENCE_DAY: 4,
      TARGET_CPA: 5,
      UPPER_LIMIT: 6,
      MINIMUM_LIMIT: 7,
      MINIMUM_LIMIT_CPC: 6
    }
  },
  SORT_TYPE: {
    ASC: "ASC",
    DESC: "DESC"
  },
  REFERENCE_DAY: [
    {value: "strong", text: "期間長め", numberValue: 10},
    {value: "medium", text: "期間普通", numberValue: 6},
    {value: "weak", text: "期間短め", numberValue: 3},
    {value: "", text: "未設定"}
  ],
  NEWLINE_CONVERSION_TYPE: [
    {value: "Install", text: "Install"},
    {value: "CV", text: "CV"}
  ],
  MAP_CONVERSION_NEW_LINE: {
    install: "Install",
    cv: "CV"
  },
  CONVERSION_NEW_LINE_DEFAULT: "Install"
}

export default stdRule
