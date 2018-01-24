
var init = require('./init')
var modules = require('./modules')

var toHTML = init([
  modules.attributes,
  modules.props,
  modules.class,
  modules.style,
  modules.dataset
])

module.exports = toHTML
