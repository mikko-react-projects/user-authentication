require('babel-register')({
    presets: [
      'env'
    ],
    "plugins": [
      'transform-object-rest-spread'
    ]
})

// Import the rest of our application.
module.exports = require('./index.js')
