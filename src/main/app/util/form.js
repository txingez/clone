import {scroller} from 'react-scroll'

export function scrollToFirstError(errors, containerId = undefined) {
  if (errors === undefined) return null
  let props = containerId ? {offset: -200, containerId: containerId} : {offset: -200}

  let key = Object.keys(errors)[0]
  let data = errors
  let firstError = key
  while (typeof data[key] === 'object') {
    data = data[key]
    key = Object.keys(data)
    firstError += "."
    firstError += key
  }

  if (document.querySelector(`[name="position-${firstError}"]`)) {
    scroller.scrollTo(`position-${firstError}`, props)
  }
}

export function preventEnterKey(event) {
  if (event.which === 13 /* Enter */) {
    event.preventDefault()
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function blockUI() {
  $.blockUI({
    message: '<img src="/images/loading.gif" alt="Wait...">',
    css: {
      border: 'none',
      padding: '15px',
      backgroundColor: 'transparent',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: 0.5,
      color: '#fff',
      'z-index': 9999999999999999
    },
    overlayCSS: {
      backgroundColor: '#000',
      opacity: 0.6,
      cursor: 'wait',
      'z-index': 9999999999999999
    }
  })
}

