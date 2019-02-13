import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_PROFILES
} from './types';

export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

export const getProfileByHandle = (handle) => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: null
			})
		);
};

export const getProfileByUserId = (id) => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/userid/${id}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: null
			})
		);
};


export const getProfiles = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then((res) =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		);
};

export const addExperience = (expData, history) => (dispatch) => {
	axios.post('/api/profile/experience', expData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const addEducation = (eduData, history) => (dispatch) => {
	axios.post('/api/profile/education', eduData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const deleteExperience = (exp_id) => (dispatch) => {
	axios
		.delete(`/api/profile/experience/${exp_id}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteEducation = (edu_id) => (dispatch) => {
	axios
		.delete(`/api/profile/education/${edu_id}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteAccount = () => (dispatch) => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		axios
			.delete('/api/profile')
			.then((res) =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

export const createProfile = (profileData, history) => (dispatch) => {
	axios.post('/api/profile', profileData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
