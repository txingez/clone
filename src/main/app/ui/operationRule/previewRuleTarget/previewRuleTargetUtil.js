export function sortByCampaignName(data) {
  data.sort(function (a, b) {
    if (a.campaignName < b.campaignName) {
      return -1;
    }
    if (a.campaignName > b.campaignName) {
      return 1;
    }
    return 0;
  })

  return data
}

export function deleteDuplicateEvaluatedValue(result) {
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i].campaignName === result[i + 1].campaignName) {
      let newEvaluatedValues = JSON.parse(result[i].evaluatedValues).concat(JSON.parse(result[i + 1].evaluatedValues))
      let evaluatedValueNoDuplicate = newEvaluatedValues.filter((object, index) => index === newEvaluatedValues.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))
      result[i].evaluatedValues = JSON.stringify(evaluatedValueNoDuplicate)
      result.splice(i + 1, 1)
      i--
    }
  }
  return result
}
