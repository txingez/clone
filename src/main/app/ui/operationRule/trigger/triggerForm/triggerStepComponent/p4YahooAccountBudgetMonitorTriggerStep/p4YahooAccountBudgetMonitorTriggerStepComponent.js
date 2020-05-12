import React from 'react'
import {Field} from 'redux-form'
import Select from '../../../../../parts/form/select'
import UnitInput from '../../../../../parts/form/unitInput'
import Validation from '../../../../../parts/form/validation'
import triggerConstants from './p4YahooAccountBudgetMonitorTriggerStepConstants'

const P4YahooAccountBudgetMonitorTriggerStepsComponent = ({triggerSteps}) => (
  <div>
    <div key="0" className="form-inline box-line">
      <div className="form-group and "></div>
      <div className="form-group ad-object">
        <Field
          name="triggerSteps[0].adObject"
          component={Select}
          options={triggerConstants.AD_OBJECT_OPTIONS}
        />
      </div>
      <div className="form-group time-range">
        <Field
          name="triggerSteps[0].timeRange"
          component={Select}
          options={triggerConstants.TIME_RANGE_OPTIONS}
        />
      </div>
      <div className="form-group ad-performance">
        <Field
          name="triggerSteps[0].triggerComparable"
          component={Select}
          options={triggerConstants.AD_PERFORMANCE_OPTIONS}
        />
      </div>
      <div className="form-group operator-options">
        <Field
          name="triggerSteps[0].triggerOperator"
          component={Select}
          options={triggerConstants.TRIGGER_OPERATOR_OPTION}
        />
      </div>
      <div className="form-group boundary">
        <Field
          name="triggerSteps[0].boundaryValue"
          type="text"
          component={UnitInput}
          validate={[Validation.require(""), Validation.integerNumber, Validation.maxLength(9, ""), Validation.greaterThanZero, Validation.isOnlyDigitNumber]}
          showMoneySymbol="true"
        />
      </div>
    </div>
  </div>
)

export default P4YahooAccountBudgetMonitorTriggerStepsComponent
