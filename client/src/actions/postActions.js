import axios from 'axios';
import { GET_ERRORS, ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST, GET_POST, CLEAR_ERRORS } from './types';

export const addPost = (postData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then((res) => {
			dispatch({
				type: ADD_POST,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const addComment = (postID, commentData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postID}`, commentData)
		.then((res) => {
			dispatch({
				type: GET_POST,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const getPosts = () => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then((res) => {
			dispatch({
				type: GET_POSTS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_POSTS,
				payload: null
			});
		});
};

export const getPost = (post_id) => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${post_id}`)
		.then((res) => {
			dispatch({
				type: GET_POST,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_POST,
				payload: null
			});
		});
};

export const deletePost = (post_id) => (dispatch) => {
	axios
		.delete(`/api/posts/${post_id}`)
		.then((res) => {
			dispatch({
				type: DELETE_POST,
				payload: post_id
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const deleteComment = (post_id, comment_id) => (dispatch) => {
	axios
		.delete(`/api/posts/comment/${post_id}/${comment_id}`)
		.then((res) => {
			dispatch({
				type: GET_POST,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const addLike = (post_id) => (dispatch) => {
	axios
		.post(`/api/posts/like/${post_id}`)
		.then((res) => {
			dispatch(getPosts());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const removeLike = (post_id) => (dispatch) => {
	axios
		.post(`/api/posts/unlike/${post_id}`)
		.then((res) => {
			dispatch(getPosts());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
