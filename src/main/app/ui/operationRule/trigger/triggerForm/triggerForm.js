import {connect} from 'react-redux'
import React from 'react'
import {bindActionCreators} from 'redux'
import operationRuleConstant from '../../../../constants/operationRule'
import {Field, FieldArray, formValueSelector, reduxForm} from "redux-form";
import NewLineBaseTriggerStepComponent
  from "./triggerStepComponent/newLineBaseTriggerStep/newLineBaseTriggerStepComponent";
import P4YahooAdOffTriggerStepComponent
  from "./triggerStepComponent/p4YahooAdOffTriggerStep/p4YahooAdOffTriggerStepsComponent"
import P4YahooBaseTriggerStepCompnent
  from './triggerStepComponent/p4YahooBaseTriggerStep/p4YahooBaseTriggerStepComponent'
import P4YahooAccountBudgetMonitorTriggerStepComponent
  from "./triggerStepComponent/p4YahooAccountBudgetMonitorTriggerStep/p4YahooAccountBudgetMonitorTriggerStepComponent"
import NewLineAccountBudgetMonitorTriggerStepComponent
  from "./triggerStepComponent/newLineAccountBudgetMonitorTriggerStep/newLineAccountBudgetMonitorTriggerStepComponent"
import Modal from "react-bootstrap-modal";
import {preventEnterKey} from "../../../../util/form";
import validate from "./p4Line/validate";
import * as triggerAction from "../triggerAction";
import translation from '../../../../util/translation'
import P4FacebookAdOffTriggerStepsComponent
  from "./triggerStepComponent/p4FacebookAdOffTriggerStep/p4FacebookAdOffTriggerStepsComponent";
import P4FacebookBaseTriggerStepComponent
  from "./triggerStepComponent/p4FacebookBaseTriggerStep/p4FacebookBaseTriggerStepComponent";

class TriggerForm extends React.Component {
  getComponentByMedia() {
    const {handleSubmit, triggerSteps, action, isShowTriggerForm, error, setShowTriggerForm} = this.props
    const {account, onSubmit} = this.props
    if (typeof account !== 'undefined' && typeof account.selectedAccount !== 'undefined') {
      switch (account.selectedAccount.media) {
        case operationRuleConstant.MEDIA_LIST.YAHOO:
          switch (action.actionType) {
            case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
              return (<P4YahooAccountBudgetMonitorTriggerStepComponent triggerSteps={triggerSteps}/>)
            case operationRuleConstant.ACTION_TYPE_AD_OFF:
              return (<P4YahooAdOffTriggerStepComponent triggerSteps={triggerSteps}/>)
            default:
              return (<FieldArray name="triggerSteps" triggerSteps={triggerSteps} action={action}
                                  component={P4YahooBaseTriggerStepCompnent} rerenderOnEveryChange={true}/>)
          }
        case operationRuleConstant.MEDIA_LIST.NEWLINE:
          if (action.actionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR)
            return (<NewLineAccountBudgetMonitorTriggerStepComponent triggerSteps={triggerSteps}/>)

          else return (
            <FieldArray name="triggerSteps" triggerSteps={triggerSteps} action={action}
                        selectedAccount={this.props.selectedAccount} component={NewLineBaseTriggerStepComponent}
                        rerenderOnEveryChange={true}/>
          )
        case operationRuleConstant.MEDIA_LIST.FACEBOOK:
          switch (action.actionType) {
            case operationRuleConstant.ACTION_TYPE_AD_OFF:
              return (<P4FacebookAdOffTriggerStepsComponent triggerSteps={triggerSteps}/>)
            default:
              return (<FieldArray name="triggerSteps" triggerSteps={triggerSteps} action={action}
                                  selectedAccount={this.props.selectedAccount}
                                  component={P4FacebookBaseTriggerStepComponent} rerenderOnEveryChange={true}/>)
          }
      }
    }
  }

  render() {
    const {handleSubmit, triggerSteps, action, isShowTriggerForm, error, setShowTriggerForm} = this.props
    return (
      <div className="trigger-form-modal">
        <Modal className="trigger-form-modal" show={isShowTriggerForm} onHide={e => setShowTriggerForm(false)}
               aria-labelledby="ModalHeader">
          <form onSubmit={handleSubmit} onKeyPress={preventEnterKey}>
            <Modal.Header className={'modal-header-trigger'}>
              <Modal.Title id="ModalHeader">{translation.t('trigger.single_trigger')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <div className="error">{error}</div>}
              <div className="trigger-form-content">
                <label className="title">{translation.t('trigger.label')}</label>
                {this.getComponentByMedia()}
                <Field name="index" component="input" type="hidden"/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="trigger-footer">
                <div>
                  {this.props.selectedAccount.media !== "FACEBOOK" ? null :
                    <span className="tip">
                        CV1：P4F設定地点CV <br/>
                        CV2：Adsetの最適化地点CV
                      </span>
                  }
                </div>

                <div>
                  <button className="btn btn-primary" type="submit">{translation.t('save')}</button>
                  <Modal.Dismiss className="btn btn-default">{translation.t('cancel')}</Modal.Dismiss>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}

const selector = formValueSelector('triggerForm')
const operationRuleFormSelector = formValueSelector('operationRuleForm')

const mapStateToProps = (state, ownProps) => {
  return {
    isShowTriggerForm: state.triggerData.isShowTriggerForm,
    initialValues: state.triggerData.selectedTrigger,
    triggerSteps: selector(state, 'triggerSteps'),
    action: operationRuleFormSelector(state, 'action'),
    account: state.account,
    selectedAccount: state.account.selectedAccount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setShowTriggerForm: triggerAction.setShowTriggerForm
  }, dispatch)
}

const triggerForm = reduxForm({
  form: 'triggerForm',
  enableReinitialize: true,
  validate
})(TriggerForm)

export default connect(mapStateToProps, mapDispatchToProps)(triggerForm)
