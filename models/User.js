const mongoose = require('mongoose');
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
		lowercase: true,
		minlength: 5,
		unique: true,
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
