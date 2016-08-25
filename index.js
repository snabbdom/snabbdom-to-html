
var init = require('./init')
var modules = require('./modules')

var toHTML = init([
  modules.attributes,
  modules.props,
  modules.class,
  modules.style
])

module.exports = toHTML
