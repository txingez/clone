import React from 'react'
import {connect} from 'react-redux'
import triggerConstant from './p4FacebookBaseTriggerStepConstants'
import Select from '../../../../../parts/form/select'
import Validation from '../../../../../parts/form/validation'
import {change, Field, untouch} from 'redux-form'
import UnitInput from '../../../../../parts/form/unitInput'
import operationRuleConstant from "../../../../../../constants/operationRule";
import {getCurrencySymbol} from "../../../../form/operationRuleUtil";

const hasUnitSymbol = (triggerComparable) => {
  return [...triggerConstant.MONEY_BOUNDARY_VALUE, ...triggerConstant.PERCENT_BOUNDARY_VALUE].indexOf(triggerComparable) !== -1
}

const getUnitSymbol = (triggerComparable, selectedAccount) => {
  return (
    triggerConstant.MONEY_BOUNDARY_VALUE.includes(triggerComparable) ? getCurrencySymbol(selectedAccount) :
      (triggerConstant.PERCENT_BOUNDARY_VALUE.includes(triggerComparable) ? "%" : "")
  )
}

const getComparableOptions = (timeRange, actionType,adObject) => {
  const optsNotShowAdRemove = ['CV1', 'CVR1', 'CPA1', 'CV2', 'CVR2', 'CPA2']
  const optsTriggerStep = actionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE
    ? triggerConstant.AD_PERFORMANCE_OPTIONS.filter(option => !optsNotShowAdRemove.includes(option.key))
    : triggerConstant.AD_PERFORMANCE_OPTIONS
  return (timeRange !== triggerConstant.TIME_RANGE_NONE) ? optsTriggerStep
    : (actionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE && adObject === triggerConstant.ADOBJECT_AD) ?
      triggerConstant.TRIGGER_AD_REMOVE_STATUS_OPTIONS: triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS
  //action: ad remove with timerange none use delivery status instead of user status
}

function changeTimeRange (dispatch, triggerSteps, timeRange, index, actionType) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  if (timeRange === triggerConstant.TIME_RANGE_NONE) {
    newTriggerSteps[index].triggerComparable = triggerConstant.TRIGGER_COMPARABLE_STATUS
    newTriggerSteps[index].triggerOperator = triggerConstant.TRIGGER_OPERATOR_EQUAL
    newTriggerSteps[index].boundaryValue = triggerConstant.TRIGGER_STATUS_OPTIONS[0].value
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

const getOperatorOptions = (triggerComparable) => {
    return (triggerComparable === triggerConstant.TRIGGER_COMPARABLE_STATUS || triggerComparable === triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS) ?
      triggerConstant.TRIGGER_STATUS_OPERATOR_OPTIONS : triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS
}

function changeTriggerComparable (dispatch, triggerSteps, triggerComparable, index) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))

  switch (triggerComparable) {
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
  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}

const getBoundaryVariableValidation = (triggerComparable) => {
  return (triggerComparable === triggerConstant.TRIGGER_COMPARABLE_ANAA) ? [Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero,  Validation.isOnlyDigitNumber]
    : [Validation.require(""), Validation.number, Validation.maxLength(20, ""), Validation.greaterThanZero]
}

function changeAdObject (dispatch, triggerSteps, adObject, index) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  //delivery status only in ad level.
  if (triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS && adObject !== triggerConstant.ADOBJECT_AD)
  {
    newTriggerSteps[index] = Object.assign(
      {},
      newTriggerSteps[index],
      {
        triggerComparable: triggerConstant.TRIGGER_COMPARABLE_STATUS,
      }
    )
  }
  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}

function getTimeRangeByActionType(actionType) {
  switch (actionType) {
    case operationRuleConstant.ACTION_TYPE_AD_REMOVE:{
      return triggerConstant.TIME_RANGE_AD_REMOVE_OPTIONS()
    }
    default:
      return triggerConstant.TIME_RANGE_OPTIONS
  }
}

function getAdObjectOption(action) {
  if (action !== undefined){
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_AD_REMOVE: return triggerConstant.AD_OBJECT_OPTIONS_FULL
      default: return triggerConstant.AD_OBJECT_OPTIONS
    }
  }
}

function isDifferentStatusTypeComparable(actionType, value) {
  if (value === triggerConstant.TRIGGER_COMPARABLE_DELIVERY_STATUS || value === triggerConstant.TRIGGER_COMPARABLE_STATUS)
    return false
  else return true
}

const P4FacebookBaseTriggerStepsComponent = ({ dispatch, fields, meta: { error, submitFailed }, triggerSteps ,action,selectedAccount}) => (
  <div>
    {error && <strong>{error}</strong>}
    {fields.map((step, index) => (
      <div key={index} className="form-inline box-line">
        <div className="form-group and ">{index !== 0 ? "AND" : ""}</div>
        <div className="form-group ad-object">
          <Field
            name={`${step}.adObject`}
            component={Select}
            options={getAdObjectOption(action)}
            onChange={e => changeAdObject(dispatch, triggerSteps, e.target.value, index)}
          />
        </div>
        <div className="form-group time-range-facebook">
          <Field
            name={`${step}.timeRange`}
            component={Select}
            options={getTimeRangeByActionType(action.actionType)}
            onChange={e => changeTimeRange(dispatch, triggerSteps, e.target.value, index, action.actionType)}
          />
        </div>
        <div className="form-group ad-performance">
          <Field
            name={`${step}.triggerComparable`}
            component={Select}
            options={getComparableOptions(triggerSteps[index].timeRange, action.actionType,triggerSteps[index].adObject)}
            onChange={e => changeTriggerComparable(dispatch, triggerSteps, e.target.value, index)}          />
        </div>
        <div className="form-group operator-options">
          <Field
            name={`${step}.triggerOperator`}
            component={Select}
            options={getOperatorOptions(triggerSteps[index].triggerComparable)}
             />
        </div>
        <div className="form-group boundary">
          {isDifferentStatusTypeComparable(action.actionType, triggerSteps[index].triggerComparable) ?
            <Field
              name={`${step}.boundaryValue`}
              type="text"
              component={UnitInput}
              validate={getBoundaryVariableValidation(triggerSteps[index].triggerComparable)}
              showUnitSymbol={hasUnitSymbol(triggerSteps[index].triggerComparable)}
              unitSymbol={getUnitSymbol(triggerSteps[index].triggerComparable, selectedAccount)}
            />
            :
            <Field
              name={`${step}.boundaryValue`}
              component={Select}
              options={triggerConstant.TRIGGER_STATUS_OPTIONS}
            />
          }
          {triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_STATUS ? <div className="help-block"></div> : null }
        </div>
        <div className = "form-group"><span className={"glyphicon glyphicon-remove remove "} onClick={() => fields.remove(index)}></span></div>
      </div>
    ))}
    <div className="box-line clearfix">
      <div className="pull-right">
        {fields.length < triggerConstant.MAX_TRIGGER_NUMBER ?
          <button className="btn btn-primary plus" type="button" onClick={() => fields.push(triggerConstant.NEW_TRIGGER_STEP)}>+</button>
          : null
        }
      </div>
    </div>
  </div>
)

export default connect(null, null) (P4FacebookBaseTriggerStepsComponent)
