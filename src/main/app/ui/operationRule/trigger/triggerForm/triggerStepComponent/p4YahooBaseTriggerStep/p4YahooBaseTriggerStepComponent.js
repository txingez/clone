import React from 'react'
import {connect} from 'react-redux'
import triggerConstant from './p4YahooBaseTriggerStepConstants'
import Select from '../../../../../parts/form/select'
import Validation from '../../../../../parts/form/validation'
import { change, Field } from 'redux-form'
import UnitInput from '../../../../../parts/form/unitInput'
import operationRuleConstant from "../../../../../../constants/operationRule";

const getComparableOptions = (timeRange, adObject) => {
  if (adObject === triggerConstant.ADOBJECT_ADGROUP || adObject === triggerConstant.ADOBJECT_AD)
    return [...triggerConstant.AD_PERFORMANCE_OPTIONS, triggerConstant.TRIGGER_COMPARABLE_YAHOO_AVERAGE_DELIVER_RANK]
  else
    return triggerConstant.AD_PERFORMANCE_OPTIONS
}

const hasUnitSymbol = (triggerComparable) => {
  return [...triggerConstant.MONEY_BOUNDARY_VALUE, ...triggerConstant.PERCENT_BOUNDARY_VALUE].indexOf(triggerComparable) !== -1
}

const getUnitSymbol = (triggerComparable) => {
  return (
    triggerConstant.MONEY_BOUNDARY_VALUE.includes(triggerComparable) ? operationRuleConstant.ACTION_UNIT_PARAMETER['JPY'].find(unitParameter => unitParameter.value === 'NUMBER').text :
      (triggerConstant.PERCENT_BOUNDARY_VALUE.includes(triggerComparable) ? '%' : '')
  )
}

const getBoundaryVariableValidation = (triggerComparable) => {
  return (triggerComparable === triggerConstant.TRIGGER_COMPARABLE_ANAA) ? [Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero,  Validation.isOnlyDigitNumber]
    : [Validation.require(""), Validation.number, Validation.maxLength(20, ""), Validation.greaterThanZero]
}

function changeAdObject (dispatch, triggerSteps, adObject, index) {
  let newTriggerSteps = JSON.parse(JSON.stringify(triggerSteps))
  if (adObject !== triggerConstant.ADOBJECT_ADGROUP && adObject !== triggerConstant.ADOBJECT_AD
    && triggerSteps[index].triggerComparable === triggerConstant.TRIGGER_COMPARABLE_AVERAGE_DELIVER_RANK)
  {
    newTriggerSteps[index] = Object.assign(
      {},
      newTriggerSteps[index],
      {
        triggerComparable: triggerConstant.NEW_TRIGGER_STEP.triggerComparable,
        triggerOperator: triggerConstant.NEW_TRIGGER_STEP.triggerOperator,
        boundaryValue: triggerConstant.NEW_TRIGGER_STEP.boundaryValue
      }
    )
  }
  dispatch(change('triggerForm', 'triggerSteps', newTriggerSteps))
}

const P4YahooIncreaseDecreaseAdBidTriggerStepsComponent = ({ dispatch, fields, meta: { error, submitFailed }, triggerSteps ,action}) => (
  <div>
    {error && <strong>{error}</strong>}
    {fields.map((step, index) => (
      <div key={index} className="form-inline box-line">
        <div className="form-group and ">{index !== 0 ? "AND" : ""}</div>
        <div className="form-group ad-object">
          <Field
            name={`${step}.adObject`}
            component={Select}
            options={triggerConstant.AD_OBJECT_OPTIONS}
            onChange={e => changeAdObject(dispatch, triggerSteps, e.target.value, index)}
      />
        </div>
        <div className="form-group time-range">
          <Field
            name={`${step}.timeRange`}
            component={Select}
            options={triggerConstant.TIME_RANGE_OPTIONS}
          />
        </div>
        <div className="form-group ad-performance">
          <Field
            name={`${step}.triggerComparable`}
            component={Select}
            options={getComparableOptions(triggerSteps[index].timeRange, triggerSteps[index].adObject)}
          />
        </div>
        <div className="form-group operator-options">
          <Field
            name={`${step}.triggerOperator`}
            component={Select}
            options={triggerConstant.TRIGGER_OPERATOR_OPTION}
      />
        </div>
        <div className="form-group boundary">
            <Field
              name={`${step}.boundaryValue`}
              type="text"
              component={UnitInput}
              validate={getBoundaryVariableValidation(triggerSteps[index].triggerComparable)}
              showUnitSymbol={hasUnitSymbol(triggerSteps[index].triggerComparable)}
              unitSymbol={getUnitSymbol(triggerSteps[index].triggerComparable)}
            />

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

export default connect(null, null) (P4YahooIncreaseDecreaseAdBidTriggerStepsComponent)
