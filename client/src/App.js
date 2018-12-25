import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Route path="/" component={Landing} exact /> 
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
