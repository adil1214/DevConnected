const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			isAsync: true,
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// let User = mongoose.model('users', UserSchema);

module.exports = User = mongoose.model('users', UserSchema);
