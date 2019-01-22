import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import configureStore from './store/configureStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-ExpEdu/AddExperience';
import AddEducation from './components/add-ExpEdu/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import './App.css';

const store1 = configureStore();

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store1.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store1.dispatch(logoutUser());
		store1.dispatch(clearCurrentProfile());
		window.location.href = '/login';
	}
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
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/handle/:handle" component={Profile} />
							<Route exact path="/profile/id/:id" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								<PrivateRoute exact path="/create-profile" component={CreateProfile} />
								<PrivateRoute exact path="/edit-profile" component={EditProfile} />
								<PrivateRoute exact path="/add-experience" component={AddExperience} />
								<PrivateRoute exact path="/add-education" component={AddEducation} />
								<PrivateRoute exact path="/feed" component={Posts} />
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
