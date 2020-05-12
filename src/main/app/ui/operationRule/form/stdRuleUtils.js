export function addCommas(inputValue) {
  const value = inputValue !== undefined ? inputValue : ""
  const parts = value.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

export function checkIsEdited(rowData, columnName) {
  return rowData.editedCell && rowData.editedCell.includes(columnName)
}

export function getTableDataWithFilter(searchText, tableData) {
  const copyTableData = Object.assign([], tableData)
  return searchText !== ""
    ? copyTableData.filter(row => {
      return row.adGroupName.toLowerCase().includes(searchText.toLowerCase())
    })
    : copyTableData
}
