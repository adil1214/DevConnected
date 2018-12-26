import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import configureStore from './store/configureStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

const store1 = configureStore();

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store1.dispatch(setCurrentUser(decoded));
}

class App extends Component {
	render() {
		return (
			<Provider store={store1}>
				<Router>
					<div className="App">
						<Navbar />
						<Route path="/" component={Landing} exact />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
