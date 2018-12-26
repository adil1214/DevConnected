import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register', userData)
		.then((res) => history.push('/login')) // redirect to login page
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login - Get user token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			// Save token to localstorage
			const {token} = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
	);
};

export const setCurrentUser = (decoded) => ({
	type: SET_CURRENT_USER,
	payload: decoded
});