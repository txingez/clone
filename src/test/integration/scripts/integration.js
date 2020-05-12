let cap = (() => {
  let capNumber = 0
  return { path: name => '.build/test/' + ++capNumber + '-' + name + '.png' }
})()

casper.test.begin('pyxis', function suite (test) {
  casper.run(() => test.done())
})
