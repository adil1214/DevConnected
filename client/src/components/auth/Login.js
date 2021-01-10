import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if (nextProps.auth.isAuthenticated) {
			nextProps.history.push('/dashboard');
		}

		if (nextProps.errors) {
			return { errors: nextProps.errors };
    }
    return null;
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	render() {
		const { errors } = this.state;

		return (
			<div>
				<div className="login">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Log In</h1>
								<p className="lead text-center">Sign in to your DevConnector account</p>
								<form onSubmit={this.onSubmit}>
									<TextFieldGroup
										type="email"
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
										error={errors.email}
									/>
									<TextFieldGroup
										type="password"
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
										error={errors.password}
									/>
									<input type="submit" className="btn btn-info btn-block mt-4" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});


export default connect(mapStateToProps, { loginUser })(Login);
