import React, {Component} from 'react';

class User extends Component {
	render() {
		const {user, activeUser} = this.props;
		const active = (user === activeUser) ? 'active' : '';
		return (
			<li className={active}>
				{user.name}
			</li>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired,
	activeUser: React.PropTypes.object.isRequired
}

export default User