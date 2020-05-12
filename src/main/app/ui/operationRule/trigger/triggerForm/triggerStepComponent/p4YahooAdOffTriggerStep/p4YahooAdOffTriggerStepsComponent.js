import React from 'react'
import trigger from './p4YahooAdOffTriggerStepsConstants'
import Select from '../../../../../parts/form/select'
import Validation from '../../../../../parts/form/validation'
import {Field} from 'redux-form'
import UnitInput from '../../../../../parts/form/unitInput'
import translation from '../../../../../../util/translation'
import LabelANAA from '../../../../../parts/form/labelANAA'

const P4YahooAdOffTriggerStepsComponent = ({triggerSteps}) => (
  <div>
    <div key="0" className="form-inline box-line">
      <div className="form-group and "></div>
      <div className="form-group ad-object">
        <Field
          name="triggerSteps[0].adObject"
          component={Select}
          options={[trigger.AD_OBJECT_OPTIONS_ADGROUP]}
        />
      </div>
      <div className="form-group time-range">
        <Field
          name="triggerSteps[0].timeRange"
          component={Select}
          options={[trigger.TIME_RANGE_OPTIONS_NONE]}
        />
      </div>
      <div className="form-group ad-performance">
        <Field
          name="triggerSteps[0].triggerComparable"
          component={Select}
          options={[trigger.AD_PERFORMANCE_OPTIONS_ANAA]}
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
      {LabelANAA}
    </div>
    <div className="form-inline box-line text-line">
      <div class="form-group and "> AND</div>
      <div class="form-group">
        {translation.t('trigger.yahoo.fixed_label_trigger_line_2')}
      </div>
    </div>
    <div key="1" className="form-inline box-line">
      <div className="form-group and "> AND</div>
      <span>{translation.t('trigger.yahoo.fixed_show_trigger_line_3')}</span>
      <div className="form-inline box-line text-line label-trigger-4">
        <div className="form-group and "> AND</div>
        <div className="form-group">
          {translation.t('trigger.yahoo.fixed_label_trigger_line_4')}
        </div>
      </div>
    </div>
  </div>
)

export default P4YahooAdOffTriggerStepsComponent
