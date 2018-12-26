import { SET_CURRENT_USER } from '../actions/types';
import { isEmpty } from '../utils/is-empty';

const authReducerDefaultState = {
	isAuthenticated: false,
	users: {}
};

export default (state = authReducerDefaultState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
};
