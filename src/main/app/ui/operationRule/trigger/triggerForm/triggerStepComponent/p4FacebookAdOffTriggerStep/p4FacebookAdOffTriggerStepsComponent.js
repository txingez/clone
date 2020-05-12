import React from 'react'
import trigger from './p4FacebookAdOffTriggerStepsConstants'
import Select from '../../../../../parts/form/select'
import Validation from '../../../../../parts/form/validation'
import {Field} from 'redux-form'
import UnitInput from '../../../../../parts/form/unitInput'

const P4FacebookAdOffTriggerStepsComponent = ({triggerSteps}) => (
  <div>
    <div key="0" className="form-inline box-line">
      <div className="form-group and "></div>
      <div className="form-group ad-object">
        <Field
          name="triggerSteps[0].adObject"
          component={Select}
          options={[trigger.AD_OBJECT_OPTIONS_ADSET]}
        />
      </div>
      <div className="form-group time-range-facebook">
        <Field
          name="triggerSteps[0].timeRange"
          component={Select}
          options={[trigger.TIME_RANGE_OPTIONS_7days]}
        />
      </div>
      <div className="form-group ad-performance">
        <Field
          name="triggerSteps[0].triggerComparable"
          component={Select}
          options={[trigger.AD_PERFORMANCE_OPTIONS_CUSTOMCV]}
        />
      </div>
      <div className="form-group operator-options">
        <Field
          name="triggerSteps[0].triggerOperator"
          component={Select}
          options={[trigger.TRIGGER_OPERATOR_OPTION_GREATER]}
        />
      </div>
      <div className="form-group boundary">
        <Field
          name="triggerSteps[0].boundaryValue"
          type="text"
          component={UnitInput}
          validate={[Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero, Validation.isOnlyDigitNumber]}
        />
      </div>
    </div>
    <div key="0" className="form-inline box-line">
      <div className="form-group and "> AND</div>
      <div className="form-group ad-object">
        <Field
          name="triggerSteps[1].adObject"
          component={Select}
          options={[trigger.AD_OBJECT_OPTIONS_AD]}
        />
      </div>
      <div className="form-group time-range-facebook">
        <Field
          name="triggerSteps[1].timeRange"
          component={Select}
          options={[trigger.TIME_RANGE_OPTIONS_7days]}
        />
      </div>
      <div className="form-group ad-performance">
        <Field
          name="triggerSteps[1].triggerComparable"
          component={Select}
          options={[trigger.AD_PERFORMANCE_OPTIONS_CPA]}
        />
      </div>
      <div className="form-group operator-options">
        <Field
          name="triggerSteps[1].triggerOperator"
          component={Select}
          options={[trigger.TRIGGER_OPERATOR_OPTION_GREATER]}
        />
      </div>
      <div className="form-group time-range-facebook">
        <Field
          name="triggerSteps[1].timeRange"
          component={Select}
          options={[trigger.TIME_RANGE_OPTIONS_7days]}
        />
      </div>
      <div className="form-group">
        <span>[Ad]'s CPC÷(CVR＋(√(CVR(1-CVR)/Click) ×1.28))</span>
      </div>
    </div>
    <div key="0" className="form-inline box-line">
      <div className="form-group and "> AND</div>
      <div className="form-group ad-object">
        <Field
          name="triggerSteps[2].adObject"
          component={Select}
          options={[trigger.AD_OBJECT_OPTIONS_ADSET]}
        />
      </div>
      <div className="form-group time-range-facebook">
        <Field
          name="triggerSteps[2].timeRange"
          component={Select}
          options={[trigger.TIME_RANGE_OPTIONS_7days]}
        />
      </div>
      <div className="form-group ad-performance">
        <Field
          name="triggerSteps[2].triggerComparable"
          component={Select}
          options={[trigger.AD_PERFORMANCE_OPTIONS_COST_SHARE]}
        />
      </div>
      <div className="form-group operator-options">
        <Field
          name="triggerSteps[2].triggerOperator"
          component={Select}
          options={[trigger.TRIGGER_OPERATOR_OPTION_GREATER]}
        />
      </div>
      <div className="form-group boundary">
        <Field
          name="triggerSteps[1].boundaryValue"
          type="text"
          component={UnitInput}
          validate={[Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero, Validation.isOnlyDigitNumber]}
        />
      </div>
      <div className="form-group">
        <input type="button" className="tail-label"
               value="%"></input>
      </div>
    </div>
    <div key="0" className="form-inline box-line">
      <div className="form-group and "> AND</div>
      <div className="form-group ad-object">
        <Field
          name="triggerSteps[3].adObject"
          component={Select}
          options={[trigger.AD_OBJECT_OPTIONS_ADSET]}
        />
      </div>
      <div className="form-group time-range-facebook">
        <Field
          name="triggerSteps[3].timeRange"
          component={Select}
          options={[trigger.TIME_RANGE_OPTIONS_7days]}
        />
      </div>
      <div className="form-group ad-performance">
        <Field
          name="triggerSteps[3].triggerComparable"
          component={Select}
          options={[trigger.AD_PERFORMANCE_OPTIONS_CV_SHARE]}
        />
      </div>
      <div className="form-group operator-options">
        <Field
          name="triggerSteps[3].triggerOperator"
          component={Select}
          options={[trigger.TRIGGER_OPERATOR_OPTION_GREATER]}
        />
      </div>
      <div className="form-group boundary">
        <Field
          name="triggerSteps[2].boundaryValue"
          type="text"
          component={UnitInput}
          validate={[Validation.require(""), Validation.integerNumber, Validation.maxLength(2, ""), Validation.greaterThanZero, Validation.isOnlyDigitNumber]}
        />
      </div>
      <div className="form-group">
        <input type="button" className="tail-label"
               value="%"></input>
      </div>
    </div>
    <div key="1" className="form-inline box-line">
      <div className="form-group and "> AND</div>
      <span>[Last 7 days (exclude Today)] [Ad] [CV share] >= [Last 7 days (exclude Today)] [Ad] [Cost share]</span>
    </div>
  </div>
)

export default P4FacebookAdOffTriggerStepsComponent
