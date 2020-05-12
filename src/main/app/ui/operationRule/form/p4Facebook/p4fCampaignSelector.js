import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SearchableSelectComponent from "./searchableSelectComponent"
import {Field} from 'redux-form'
import translation from '../../../../util/translation'
import Validation from "../../../parts/form/validation";

class P4FCampaignSelector extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className="min-height-200 padding-right-10">
        <label>{translation.t('target_campaign_label')}<span className="symbol-require">*</span></label>
        <div className="box-line">
          <Field
            component={SearchableSelectComponent}
            className="form-control"
            onChange={this.props.onChange}
            name="extension.targetCampaign.campaignId"
            options={this.props.campaigns}
            placeholder=""
            validate={[Validation.require(translation.t('target_campaign_label'))]}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4FCampaignSelector)
