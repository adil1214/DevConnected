const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Test posts 
// @access  Public
router.get('/test', (req, res) => {
	res.json({ msg: 'Posts works.' });
});

// @route   GET api/posts/
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: 'desc' })
		.then((posts) => {
			res.json(posts);
		})
		.catch((err) => res.status(404).json({ nopostsfound: 'No posts found with that id' }));
});

// @route   GET api/posts/:id
// @desc    Get a single post by id
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			res.json(post);
		})
		.catch((err) => res.status(404).json({ nopostfound: 'No post found with that id' }));
});

// @route   POST api/posts/
// @desc    Create a post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost
		.save()
		.then((post) => {
			res.json(post);
		})
		.catch((err) => res.status(400).json(err));
});

// @route   DELETE api/posts/:id
// @desc    Delete a post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			Post.findById(req.params.id).then((post) => {
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ notauthorized: 'User not authorized' });
				}
				post
					.remove()
					.then(() => res.json({ success: true }))
					.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
			});
		}
	});
});

// @route   POST api/posts/like/:id
// @desc    like a post by id
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			Post.findById(req.params.id).then((post) => {
				if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
					res.status(400).json({ alreadyliked: 'User already liked this post' });
				}

				post.likes.unshift({ user: req.user.id });
				post.save().then((post) => res.json(post));
			});
		}
	});
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post by post id
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			Post.findById(req.params.id).then((post) => {
				if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
					res.status(400).json({ notliked: 'You have not yet liked this post' });
				}

				const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.params.id);
				post.likes.splice(removeIndex, 1);
				post.save().then((post) => res.json(post));
			});
		}
	});
});

// @route   POST api/posts/comment/:id
// @desc    Add a comment to a post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id).then((post) => {
		const newComment = {
			user: req.user.id,
			text: req.body.text,
			name: req.user.name,
			avatar: req.user.avatar
		};

		post.comments.unshift(newComment);
		post
			.save()
			.then((post) => res.json(post))
			.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove a comment from a post using post id and comment id
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id).then((post) => {
		if (post.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
			return res.status(404).json({ commentnotfound: 'The requested comment doesnt exist' });
		}
		const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.comment_id);
		post.comments.splice(removeIndex, 1);
		post.save().then((post) => res.json(post)).catch((err) => res.status(400).json(err));
	});
});

module.exports = router;
