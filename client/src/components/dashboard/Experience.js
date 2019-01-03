import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
	onDeleteClick(id) {
		this.props.deleteExperience(id);
	}

	render() {
		let experienceRows = this.props.experience.map((exp, idx) => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD" date={exp.from} /> -
					{exp.to === null ? ' Now' : <Moment format="YYYY/MM/DD" date={exp.to} />}
				</td>
				<td>
					<button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>

						{experienceRows}
					</thead>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
