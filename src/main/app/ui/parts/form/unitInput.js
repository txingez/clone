import React from 'react'

const UnitInput = ({input, type, meta: {touched, error, invalid}, showUnitSymbol, unitSymbol}) => (
  <div>
    <div className="input-group">
      <input {...input} type={type}
             className={"form-control trigger-money-input " + (touched && error ? " has-error" : "")}
             autoComplete="off"/>
      {showUnitSymbol && unitSymbol ? <span className="input-group-addon">{unitSymbol}</span> :
        showUnitSymbol ? <span className="input-group-addon">¥</span> : null}
    </div>
    <div className="help-block">
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

export default UnitInput
