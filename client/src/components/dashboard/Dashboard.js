import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = <h4>TODO: display profile</h4>;
			} else {
				// user logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>you have not yet set up a profile, please add some info</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
