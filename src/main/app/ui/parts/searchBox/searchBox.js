import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updateSearchText} from "../../operationRule/form/stdRuleAction"

class SearchBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleSearch(e) {
    const searchValue = e.target.value
    this.props.updateSearchText(searchValue)
  }

  render() {
    return (
      <div>
        <span className="glyphicon glyphicon-search"></span>
        <input type="search" placeholder="アドグループ検索"
               onChange={this.handleSearch.bind(this)}
               value={this.props.searchText}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchText: state.stdRule.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateSearchText: updateSearchText
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
