import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserForm extends Component {
	onSubmit(e) {
		e.preventDefault();
		const node = this.refs.user;
		const userName = node.value;
		this.props.setUser(userName);
		node.value = '';
	}
	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<div className='form-group'>
					<input
						className='form-control'
						type='text'
						placeholder='Set Your Name...'
						ref='user'
					/>
				</div>
			</form>
		)
	}
}

UserForm.propTypes = {
	setUser: PropTypes.func.isRequired
}

export default UserForm