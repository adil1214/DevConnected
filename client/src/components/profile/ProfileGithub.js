import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileGithub extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sort: 'updated',
			type: 'owner',
			count: 7,
			repos: []
		};
	}

	_isMounted = false; // workaround (updating the state when the component is unmounted is a "no-op")

	componentDidMount() {
		this._isMounted = true;
		const { username } = this.props;

		axios
			.get(
				`http://localhost:5000/api/profile/github/${username}?per_page=${this
					.state.count}&sort=${this.state.sort}&type=${this.state.type}`
			)
			.then(({ data }) => {
				if (this._isMounted) {
					this.setState((prevState, props) => ({ repos: data }));
				}
			})
			.catch((err) => {
				if (this._isMounted) {
					this.setState(() => ({ repos: [] }));
				}
				// console.log(err.response);
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { repos } = this.state;
		const repoItems = repos.map((repo) => {
			return (
				<div className="card card-body mb-2" key={repo.id}>
					<div className="row">
						<div className="col-md-6">
							<h4>
								<a href={repo.html_url} className="text-info" _target="blank">
									{repo.name}
								</a>
								<p>{repo.description}</p>
							</h4>
						</div>
						<div className="col-md-6">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers_count}
							</span>
							<span className="badge badge-info mr-1">
								Forks: {repo.forks_count}
							</span>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				<hr />
				<h3 className="mb-4">Latest Github Items</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGithub;
