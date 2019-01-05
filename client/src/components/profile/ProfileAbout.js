import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/is-empty';

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;
		const firstName = profile.user.name.trim().split(' ')[0];
		const skillSet = profile.skills.map((skill, idx) => (
			<div className="p-3" key={idx}>
				<i className="fa fa-check" /> {skill}
			</div>
		));

		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="card card-body bg-light mb-3">
							<h3 className="text-center text-info">{firstName}'s bio</h3>
							<p className="lead">{isEmpty(profile.bio) ? <span /> : <span>{profile.bio}</span>}</p>
							<hr />
							<h3 className="text-center text-info">Skill Set</h3>
							<div className="row">
								<div className="d-flex flex-wrap justify-content-center align-items-center">
									{skillSet}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
