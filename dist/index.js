
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-formik.cjs.production.min.js')
} else {
  module.exports = require('./react-native-formik.cjs.development.js')
}
