const validate = value => {
  let errors = {}

  let triggerStepArrayErrors = []
  if (typeof value.triggerSteps != 'undefined') {
    value.triggerSteps.forEach((step, stepIndex) => {
      const stepErrors = {}
      if (!step || !step.boundaryValue) {
        stepErrors.boundaryValue = 'Required'
        triggerStepArrayErrors[stepIndex] = stepErrors
      }
    })
  }

  if (triggerStepArrayErrors.length) {
    errors.triggerSteps = triggerStepArrayErrors
  }
  return errors
}

export default validate
