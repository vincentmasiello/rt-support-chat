import React, {Component} from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

class UserSection extends Component {
	render() {
		return(
			<div className='support panel panel-primary'>
				<div className='panel-heading'>
					<strong>Users</strong>
				</div>
				<div>
					<UserList {...this.props} />
					<UserForm {...this.props} />
				</div>
			</div>
		)
	}
}

UserSection.propTypes = {
	users: React.PropTypes.array.isRequired,
	setUser: React.PropTypes.func.isRequired,
	activeUser: React.PropTypes.func.isRequired,
	addUser: React.PropTypes.func.isRequired
}

export default UserSection