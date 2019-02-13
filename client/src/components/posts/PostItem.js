import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
	onDeleteClick(post_id) {
		this.props.deletePost(post_id);
	}

	onLikeClick(post_id) {
		this.props.addLike(post_id);
	}

	onUnlikeClick(post_id) {
		this.props.removeLike(post_id);
	}

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter((like) => like.user === auth.user.id).length === 0) {
			return false;
		} else {
			return true;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to={`/profile/userid/${post.user}`}>
							<img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
						</Link>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{showActions && (
							<div>
								<button
									onClick={this.onLikeClick.bind(this, post._id)}
									type="button"
									className="btn btn-light mr-1"
								>
									<i
										className={classnames('fas fa-thumbs-up', {
											'text-info': this.findUserLike(post.likes)
										})}
									/>
									<span className="badge badge-light">{post.likes.length}</span>
								</button>
								<button
									onClick={this.onUnlikeClick.bind(this, post._id)}
									type="button"
									className="btn btn-light mr-1"
								>
									<i className="text-secondary fas fa-thumbs-down" />
								</button>
								<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
									Comments
								</Link>
								{post.user === auth.user.id ? (
									<button
										onClick={this.onDeleteClick.bind(this, post._id)}
										type="button"
										className="btn btn-danger mr-1"
									>
										<i className="fas fa-times" />
									</button>
								) : null}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired
};

PostItem.defaultProps = {
	showActions: true
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
