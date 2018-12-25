import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = [thunk];	 // add new middlewares here

export default () => {
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(...middleware))
	);

	return store;
};