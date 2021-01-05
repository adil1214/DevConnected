import {
	POST_LOADING,
	ADD_POST,
	GET_POSTS,
	DELETE_POST,
	GET_POST
} from '../actions/types';

const postReducerDefaultState = {
	posts: [],
	post: {},
	loading: false
};

const postReducer = (state = postReducerDefaultState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload)
			};
		case GET_POST:
			return {
				...state,
				loading: false,
				post: action.payload
			};
		default:
			return state;
	}
};

export default postReducer;
