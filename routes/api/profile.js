const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const normalizeUrl = require('normalize-url');
const axios = require('axios');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => {
	res.json({ msg: 'Profile works.' });
});

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create & Edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};
	// #region profileFields setup
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',').filter((val) => val).map((val) => val.trim());
	}

	const normalizeUrlOptions = { forceHttps: true };
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = normalizeUrl(req.body.youtube, normalizeUrlOptions);
	if (req.body.twitter) profileFields.social.twitter = normalizeUrl(req.body.twitter, normalizeUrlOptions);
	if (req.body.facebook) profileFields.social.facebook = normalizeUrl(req.body.facebook, normalizeUrlOptions);
	if (req.body.linkedin) profileFields.social.linkedin = normalizeUrl(req.body.linkedin, normalizeUrlOptions);
	if (req.body.instagram) profileFields.social.instagram = normalizeUrl(req.body.instagram, normalizeUrlOptions);
	//#endregion

	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			// Update the profile
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then((profile) => {
				res.json(profile);
			});
		} else {
			// check if handle available
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'Handle already exists';
					res.status(400).json(errors);
				}
				// Create the profile
				new Profile(profileFields).save().then((profile) => {
					res.json(profile);
				});
			});
		}
	});
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
	errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/id/:id
// @desc    Get profile by id (user id)
// @access  Public
router.get('/userid/:id', (req, res) => {
	errors = {};
	Profile.findOne({ user: req.params.id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
	errors = {};
	Profile.findOne({ _id: req.params.user_id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json({ error: 'there is no profile for this user.' }));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find({})
		.populate('user', [ 'name', 'avatar' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noprofiles = 'There are no profiles';
				res.status(404).json(errrors);
			}
			res.json(profiles);
		})
		.catch((err) => res.status(400).json({ error: 'There are no profiles' }));
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateExperienceInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.experience.unshift(newExp);
			profile.save().then((profile) => res.json(profile));
		})
		.catch((err) => res.status(404).json(err));
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateEducationInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.education.unshift(newEdu);
			profile.save().then((profile) => res.json(profile));
		})
		.catch((err) => res.status(404).json(err));
});

// @route   DELETE api/profile/experience
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);

			profile.experience.splice(removeIndex, 1);
			profile.save().then((profile) => res.json(profile));
		})
		.catch((err) => res.status(404).json(err));
});

// @route   DELETE api/profile/education
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			const removeIndex = profile.education.map((item) => item.id).indexOf(req.params.edu_id);

			profile.education.splice(removeIndex, 1);
			profile.save().then((profile) => res.json(profile));
		})
		.catch((err) => res.status(404).json(err));
});

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id }).then((profile) => {
		User.findOneAndRemove({ _id: req.user.id }).then(() => {
			res.json({ success: true });
		});
	});
	}
);

// @route    api/profile/github/:username
// @desc    get github user repos
// @access  Private
router.get('/github/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.github.com/users/${req.params.username}/repos`,
			{
				params: {
          ...req.query
				},
				auth: {
					username: process.env.githubClientId,
					password: process.env.githubclientSecret
				}
			}
    );
    
    const data = await response.data;
    
		// const ownedRepos = data.filter(({ fork }) => !fork);
    // res.json({ length: ownedRepos.length, ownedRepos });
    
		res.json(data);
	} catch (error) {
    console.log(error)
		res.status(400).json("check server log");
	}
});

module.exports = router;
