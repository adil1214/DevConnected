import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDeleteClick(id) {
		this.props.deleteExperience(id);
	}

	render() {
		let educationRows = this.props.education.map((edu, idx) => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD" date={edu.from} /> -
					{edu.to === null ? ' Now' : <Moment format="YYYY/MM/DD" date={edu.to} />}
				</td>
				<td>
					<button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>

						{educationRows}
					</thead>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
