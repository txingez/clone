import React from 'react'
import {Field} from 'redux-form'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import operationRuleConstant from "../../../../constants/operationRule"
import CheckboxSlider from "../../../parts/form/checkboxSlider"
import * as operationRuleAction from "../../operationRuleAction"
import translation from '../../../../util/translation'


class AccountReactive extends React.Component {

  constructor(props) {
    super(props)
  }

  changeNextDayActivateStatus = (accountReactive) => {
    this.props.updateNextDayActivateStatus(accountReactive)
  }

  render() {
    const {action, accountReactive} = this.props
    return (
      <div>
        {(action.actionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR) ? <div className="box-right">
          <label className="reactive-label">{translation.t('next_day_activation_button_label')}</label>
          <Field component={CheckboxSlider}
                 name="extension.action.accountReactive"
                 checked={accountReactive === true} //If only checked={statusEnabled} will lead to error changing uncontrolled component to controlled component
                 onSwitch={e => this.changeNextDayActivateStatus(accountReactive)}
          />
        </div> : null}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNextDayActivateStatus: operationRuleAction.changeNextDayActivateStatus
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AccountReactive)
