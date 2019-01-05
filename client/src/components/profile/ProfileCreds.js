import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// import { isEmpty } from '../../utils/is-empty';

class ProfileCreds extends Component {
	render() {
		const { education, experience } = this.props;
		const eduItems = education.map((edu) => (
			<li className="list-group-item" key={edu._id}>
				<h4>{edu.school}</h4>
				<p>
					<Moment date={edu.from} format="YYYY/MM/DD" /> -
					{edu.current ? ' Now' : <Moment date={edu.to} format="YYYY/MM/DD" />}
				</p>
				<p>
					<strong>Degree: {edu.degree}</strong>
				</p>
				<p>
					{edu.fieldofstudy === '' ? null : (
						<span>
							<strong>Field Of study: {edu.fieldofstudy}</strong>
						</span>
					)}
				</p>
				<p>
					{edu.description === '' ? null : (
						<span>
							<strong>Description: {edu.description}</strong>
						</span>
					)}
				</p>
			</li>
		));

		const expItems = experience.map((exp) => (
			<li className="list-group-item" key={exp._id}>
				<h4>{exp.company}</h4>
				<p>
					<Moment date={exp.from} format="YYYY/MM/DD" /> -
					{exp.current ? ' Now' : <Moment date={exp.to} format="YYYY/MM/DD" />}
				</p>
				<p>
					<strong>Position: {exp.title}</strong>
				</p>
				<p>
					{exp.location === '' ? null : (
						<span>
							<strong>Location: {exp.location}</strong>
						</span>
					)}
				</p>
				<p>
					{exp.description === '' ? null : (
						<span>
							<strong>description: {exp.description}</strong>
						</span>
					)}
				</p>
			</li>
		));

		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<h3>Experience</h3>
						{expItems.length > 0 ? (
							<ul className="list-group">{expItems}</ul>
						) : (
							<p className="text-center">No Experience Listed</p>
						)}
					</div>
					<div className="col-md-6">
						<h3 className="text-center text-info">Education</h3>
						{eduItems.length > 0 ? (
							<ul className="list-group">{eduItems}</ul>
						) : (
							<p className="text-center">No Education Listed</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}

ProfileCreds.propTypes = {
	experience: PropTypes.array.isRequired,
	education: PropTypes.array.isRequired
};

export default ProfileCreds;
