import React from 'react'
import {connect} from 'react-redux'
import triggerConstant from './newLineBaseTriggerStepConstants'
import Select from '../../../../../parts/form/select'
import TextInputNoHelpBlock from '../../../../../parts/form/textInputNoHelpBlock'
import Validation from '../../../../../parts/form/validation'
import { Field } from 'redux-form'
import UnitInput from '../../../../../parts/form/unitInput'
import LabelANAA from '../../../../../parts/form/labelANAA'
import operationRuleConstant from "../../../../../../constants/operationRule";
import {getCurrencySymbol} from '../../../../form/operationRuleUtil'
import { change, untouch } from 'redux-form'


function changeAdObject (dispatch, triggerSteps, adObject, index) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  if (triggerSteps[index].adObject === triggerConstant.ADOBJECT_CAMPAIGN && adObject !== triggerConstant.ADOBJECT_CAMPAIGN
    && triggerConstant.TRIGGER_BUDGET_SHORT_STATUS.includes(triggerSteps[index].boundaryValue) )
  {
    newTriggerSteps[index].boundaryValue = triggerConstant.BOUNDARY_VALUE_ON
    newTriggerSteps[index].timeRange = triggerConstant.TIME_RANGE_NONE
    newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
    newTriggerSteps[index].boundaryVariable = undefined
  } else if (triggerSteps[index].adObject === triggerConstant.ADOBJECT_ADGROUP && triggerSteps[index].timeRange === triggerConstant.TIME_RANGE_NONE) {
    newTriggerSteps[index].triggerComparable = triggerConstant.TRIGGER_COMPARABLE_STATUS
    newTriggerSteps[index].boundaryValue = triggerConstant.BOUNDARY_VALUE_ON
    newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
    newTriggerSteps[index].boundaryVariable = undefined
  } else if (adObject === triggerConstant.ADOBJECT_ACCOUNT && triggerSteps[index].timeRange === triggerConstant.TIME_RANGE_NONE) {
    newTriggerSteps[index].triggerComparable = triggerConstant.TRIGGER_COMPARABLE_STATUS
    newTriggerSteps[index].boundaryValue = triggerConstant.BOUNDARY_VALUE_ON
    newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
    newTriggerSteps[index].boundaryVariable = undefined
  } else if (triggerSteps[index].adObject === triggerConstant.ADOBJECT_AD
    && (triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_IMP || triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_COST)) {
    newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_GREATER_OR_EQUAL
    newTriggerSteps[index].boundaryVariable = undefined
  }
  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}

function changeTimeRange (dispatch, triggerSteps, timeRange, index) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  if (timeRange === triggerConstant.TIME_RANGE_NONE) {
    if (triggerSteps[index].adObject === triggerConstant.ADOBJECT_ACCOUNT) {
      newTriggerSteps[index].triggerComparable = triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS
      newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
      newTriggerSteps[index].boundaryValue = triggerConstant.TRIGGER_DELIVERY_STATUS_OPTIONS[0].value
    } else {
      newTriggerSteps[index].triggerComparable = triggerConstant.TRIGGER_COMPARABLE_STATUS
      newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
      newTriggerSteps[index].boundaryValue = triggerConstant.TRIGGER_STATUS_OPTIONS[0].value
    }
  } else if (triggerSteps[index].timeRange === triggerConstant.TIME_RANGE_NONE) {
    newTriggerSteps[index] = Object.assign(
      {},
      newTriggerSteps[index],
      {
        triggerComparable: triggerConstant.NEW_TRIGGER_STEP.triggerComparable,
        triggerOperator: triggerConstant.NEW_TRIGGER_STEP.triggerOperator,
        boundaryValue: triggerConstant.NEW_TRIGGER_STEP.boundaryValue
      }
    )
    dispatch(untouch('triggerForm', 'triggerSteps[' + index + '].boundaryValue'))
  }
  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}

function changeTriggerComparable (dispatch, triggerSteps, triggerComparable, index, actionType) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  newTriggerSteps[index].triggerComparable = triggerComparable

  switch (triggerComparable) {
    case triggerConstant.TRIGGER_COMPARABLE_ANAA : {
      newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS[0].value
      newTriggerSteps[index].boundaryValue = ''
      break;
    }
    case triggerConstant.TRIGGER_COMPARABLE_STATUS : {
      newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
      newTriggerSteps[index].boundaryValue = triggerConstant.TRIGGER_STATUS_OPTIONS[0].value
      break;
    }
    case triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS : {
      newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
      newTriggerSteps[index].boundaryValue = triggerConstant.TRIGGER_DELIVERY_STATUS_OPTIONS[0].value
      break;
    }
  }

  if(actionType === 'CTR_AD_START'){
    let oldTriggerComparable = triggerSteps[index].triggerComparable
    let isSpecialComparable = oldTriggerComparable === 'COST' || oldTriggerComparable === 'IMPRESSION'
    if(triggerComparable !== 'COST' && triggerComparable !== 'IMPRESSION' && isSpecialComparable == true) {
      newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_GREATER_OR_EQUAL
    }

    if (newTriggerSteps[index].boundaryValue == '0') {
      newTriggerSteps[index].boundaryValue = '';
    }
  }

  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}

export function changeTriggerOperator (dispatch, triggerSteps, triggerOperator, index) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  if (triggerOperator === triggerConstant.TRIGGER_OPERATOR_NOT_EQUAL
    && !triggerConstant.TRIGGER_BUDGET_SHORT_STATUS.includes(triggerSteps[index].boundaryValue)) {
    newTriggerSteps[index].boundaryValue = triggerConstant.TRIGGER_BUDGET_SHORT_DAILY_STATUS
  }
  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}
export function showBudgetShort (triggerSteps){
  return triggerConstant.TRIGGER_BUDGET_SHORT_STATUS.includes(triggerSteps.boundaryValue)
    && triggerSteps.adObject === triggerConstant.ADOBJECT_CAMPAIGN
}

const getBoundaryVariableValidation = (action, triggerStep) => {
  let validateArr = [Validation.require(""), Validation.number, Validation.maxLength(20, ""), Validation.greaterThanZero]
  switch (triggerStep.triggerComparable) {
    case triggerConstant.TRIGGER_COMPARABLE_ANAA:
      validateArr = [Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero,  Validation.isOnlyDigitNumber]
          break
    case "COST":
    case "IMPRESSION":
      if (action === operationRuleConstant.ACTION_TYPE_CTR_AD_START) {
        validateArr = [Validation.require(""), Validation.number, Validation.maxLength(20, ""), Validation.greaterOrEqualZero]
      }
      break
  }
  return validateArr
}

const getComparableOptions = (timeRange, adObject, actionType) => {
  let otherComparablesOptions = []
  switch (adObject) {
    case triggerConstant.ADOBJECT_CAMPAIGN:
      otherComparablesOptions = [...triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS, ...triggerConstant.TRIGGER_COMPARABLE_CAMPAIGN_NEW_LINE]
      break
    case triggerConstant.ADOBJECT_ADGROUP:
      otherComparablesOptions = [...triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS, ...triggerConstant.TRIGGER_COMPARABLE_AD_GROUP_NEW_LINE]
      break
    case triggerConstant.ADOBJECT_ACCOUNT:
      otherComparablesOptions = [...triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS_FOR_ACCOUNT]
      break
    default:
      otherComparablesOptions = triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS
  }
  return (timeRange !== triggerConstant.TIME_RANGE_NONE) ? triggerConstant.AD_PERFORMANCE_OPTIONS : otherComparablesOptions
}

const getOperatorOptions = (action,triggerComparable,adObject) => {
  let options = []
  if (operationRuleConstant.AD_ACTION_LIMIT.includes(action) && adObject === triggerConstant.ADOBJECT_CAMPAIGN) {
    options = (triggerComparable === triggerConstant.TRIGGER_COMPARABLE_STATUS || triggerComparable === triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS) ?
      triggerConstant.TRIGGER_STATUS_OPERATOR_OPTIONS : triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS
  } else {
    options = (triggerComparable === triggerConstant.TRIGGER_COMPARABLE_STATUS || triggerComparable === triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS) ?
      triggerConstant.TRIGGER_STATUS_OPERATOR_OPTIONS_NOT_CAMPAIGN : triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS
    if (action === operationRuleConstant.ACTION_TYPE_CTR_AD_START && ["IMPRESSION", "COST"].includes(triggerComparable) && adObject === "AD") {
      options = [...options, triggerConstant.TRIGGER_EQUAL_OPERATOR]
    }
  }
  return options
}

const getBoundaryValueOption = (action, triggerOperator,adObject,triggerComparable) => {
  switch (triggerComparable) {
    case triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS: {
      return triggerConstant.TRIGGER_DELIVERY_STATUS_OPTIONS
    }
    default:
      if (operationRuleConstant.AD_ACTION_LIMIT.includes(action) && adObject === triggerConstant.ADOBJECT_CAMPAIGN )
        if (operationRuleConstant.AD_BID_ACTIONS.includes(action))
          return (triggerOperator === triggerConstant.TRIGGER_OPERATOR_EQUAL) ? triggerConstant.TRIGGER_STATUS_OPTIONS :
            triggerConstant.TRIGGER_STATUS_OPTIONS_NOT_EQUAL
        else return (triggerOperator === triggerConstant.TRIGGER_OPERATOR_EQUAL) ? triggerConstant.TRIGGER_STATUS_OPTIONS :
          triggerConstant.TRIGGER_STATUS_CAMPAIGN_DAILY_NOT_EQUAL
      else return triggerConstant.TRIGGER_STATUS_OPTIONS_NOT_CAMPAIGN
  }
}

const hasUnitSymbol = (triggerComparable) => {
  return [...triggerConstant.MONEY_BOUNDARY_VALUE, ...triggerConstant.PERCENT_BOUNDARY_VALUE].indexOf(triggerComparable) !== -1
}

const getUnitSymbol = (triggerComparable, selectedAccount) => {
  return (
    triggerConstant.MONEY_BOUNDARY_VALUE.includes(triggerComparable) ? getCurrencySymbol(selectedAccount) :
      (triggerConstant.PERCENT_BOUNDARY_VALUE.includes(triggerComparable) ? "%" : "")
  )
}

const getIndexOfSpecialCTRAdStartTrigger = (action, triggerSteps) => {
  let isCTRAdStartAction = action.actionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START

  if(isCTRAdStartAction) {
    for(let i = 0; i < triggerSteps.length; i++) {
      let triggerTmp = {
        adObject: triggerSteps[i].adObject,
        timeRange: triggerSteps[i].timeRange,
        triggerComparable: triggerSteps[i].triggerComparable,
        triggerOperator: triggerSteps[i].triggerOperator,
        boundaryValue: triggerSteps[i].boundaryValue,
        joinCondition: triggerSteps[i].joinCondition
      }

      let isSame = JSON.stringify(triggerConstant.SPECIAL_TRIGGER_STEP_CTR_AD_START) === JSON.stringify(triggerTmp)

      if(isSame){
        return i;
      }
    }
  } else {
    return -1;
  }
}

const TriggerStepsComponent = ({ dispatch, fields, meta: { error, submitFailed }, triggerSteps, action, selectedAccount}) => (
  <div>
    {error && <strong>{error}</strong>}
    {fields.map((step, index) => (

      <div key={index} className="form-inline box-line">
        <div className="form-group and ">{index !== 0 ? "AND" : ""}</div>
        <div className="form-group ad-object">
          <Field
            name={`${step}.adObject`}
            component={Select}
            action={action.actionType}
            isDisabled={getIndexOfSpecialCTRAdStartTrigger(action, triggerSteps) === index}
            options={triggerConstant.AD_OBJECT_OPTIONS}
            onChange={e => changeAdObject(dispatch, triggerSteps, e.target.value, index)}
          />
        </div>
        <div className="form-group time-range">
          <Field
            name={`${step}.timeRange`}
            component={Select}
            action={action.actionType}
            isDisabled={getIndexOfSpecialCTRAdStartTrigger(action, triggerSteps) === index}
            options={action.actionType !== operationRuleConstant.ACTION_TYPE_AD_REMOVE ? triggerConstant.TIME_RANGE_WITHOUT_14_DAYS_OPTION : triggerConstant.TIME_RANGE_OPTIONS}
            onChange={e => changeTimeRange(dispatch, triggerSteps, e.target.value, index)}
          />
        </div>
        <div className="form-group ad-performance">
          <Field
            name={`${step}.triggerComparable`}
            component={Select}
            isDisabled={getIndexOfSpecialCTRAdStartTrigger(action, triggerSteps) === index}
            options={getComparableOptions(triggerSteps[index].timeRange, triggerSteps[index].adObject,action.actionType)}
            onChange={e => changeTriggerComparable(dispatch, triggerSteps, e.target.value, index, action.actionType)}
          />
        </div>
        <div className="form-group operator-options">
          <Field
            name={`${step}.triggerOperator`}
            component={Select}
            action={action.actionType}
            isDisabled={getIndexOfSpecialCTRAdStartTrigger(action, triggerSteps) === index}
            options={getOperatorOptions(action.actionType,triggerSteps[index].triggerComparable,triggerSteps[index].adObject)}
            onChange={e => changeTriggerOperator(dispatch, triggerSteps, e.target.value, index)}
      />
        </div>
        <div className="form-group boundary">
          {(triggerSteps[index].triggerComparable !== triggerConstant.TRIGGER_COMPARABLE_STATUS && triggerSteps[index].triggerComparable !== triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS)?
            <Field
              name={`${step}.boundaryValue`}
              type="text"
              component={UnitInput}
              validate={getBoundaryVariableValidation(action.actionType, triggerSteps[index])}
              showUnitSymbol={hasUnitSymbol(triggerSteps[index].triggerComparable)}
              unitSymbol={getUnitSymbol(triggerSteps[index].triggerComparable, selectedAccount)}
            />
            :
            <Field
              name={`${step}.boundaryValue`}
              component={Select}
              action={action.actionType}
              isDisabled={getIndexOfSpecialCTRAdStartTrigger(action, triggerSteps) === index}
              options={getBoundaryValueOption(action.actionType, triggerSteps[index].triggerOperator, triggerSteps[index].adObject,triggerSteps[index].triggerComparable)}
            />
          }
          {triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_STATUS ? <div className="help-block"></div> : null }

        </div>
      {showBudgetShort(triggerSteps[index])
        ? <div className = "form-group costRateParam" >  ({triggerConstant.COST}  >=
         <Field
         name = {`${step}.costRateParam`}
         type="text"
         component={TextInputNoHelpBlock}
         validate={[Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero, Validation.isOnlyDigitNumber]}
         /> %)
         </div>
      :null }
        { triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_ANAA
          ? LabelANAA : null
        }
        {
          getIndexOfSpecialCTRAdStartTrigger(action, triggerSteps)!== index ?
            <div className = "form-group">
              <span className={"glyphicon glyphicon-remove remove "} onClick={() => fields.remove(index)}></span>
            </div> : ''
        }

      </div>
    ))}
    <div className="box-line clearfix">
      <div className="pull-right">
        {fields.length < triggerConstant.MAX_TRIGGER_NUMBER ?
          <button className="btn btn-primary plus " type="button" onClick={() => fields.push(triggerConstant.NEW_TRIGGER_STEP)}>+</button>
          : null
        }
      </div>
    </div>
  </div>
)

export default connect(null, null)(TriggerStepsComponent)
