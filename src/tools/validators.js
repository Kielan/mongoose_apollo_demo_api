'use strict'
var validate = require('mongoose-validator')

const emailValidator = [
	validate({
		validator: 'isEmail',
		message: 'Warning: Please pass in a valid email address.'
	})
]

const nameValidator = [
	validate({
		validator: 'isLength',
		arguments: [1],
		message: 'Warning: please use a longer string.'
	})
]

const numberValidator = [
	validate({
		validator: 'isNumeric',
		message: 'Warning: this field must be entirely numeric.'
	})
]

module.exports = {
  emailValidator,
  nameValidator,
  numberValidator,
}
