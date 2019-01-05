import { POST_LOADING, ADD_POST, GET_POSTS } from '../actions/types';

const postReducerDefaultState = {
	posts: [],
	post: {},
	loading: false
};

export default (state = postReducerDefaultState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [ action.payload, ...state.posts ]
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
		default:
			return state;
	}
};
