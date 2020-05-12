class SortingUtil {
   getStateOfSorting (state) {
    switch (state) {
      case 'sorting':
        return 'sorting_desc'
      case 'sorting_desc':
        return 'sorting_asc'
      case 'sorting_asc':
        return 'sorting_desc'
      default:
        return 'sorting'
    }
  }

  getSortingResult (sortingData, sorting) {
    let column = ''
    let order = 'sorting'
    Object.keys(sorting).forEach((sortingKey) => {
      if (sorting[sortingKey] !== 'sorting') {
        column = sortingKey
        order = sorting[sortingKey]
      }
    })

    if(column === '' || order === 'sorting') {
      return sortingData
    } else {
      return (order === 'sorting_desc')
        ? _.sortBy(sortingData, (data) => { return data[column] ? data[column].toLowerCase() : '' })
        : _.sortBy(sortingData, (data) => { return data[column] ? data[column].toLowerCase() : '' }).reverse()
    }
  }

  reset (sorting) {
    Object.keys(sorting).forEach((sortingKey) => {
      sorting[sortingKey] = 'sorting'
    })
  }

}

const sortingUtil = new SortingUtil()
export default sortingUtil
