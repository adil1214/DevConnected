import { GET_ERRORS } from '../actions/types';

const errorReducerDefaultState = {};

export default (state = errorReducerDefaultState, action) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};
