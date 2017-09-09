import React, {Component} from 'react';

class User extends Component {
	render() {
		const {user, activeUser} = this.props;
		const active = (user.name === activeUser) ? 'active' : '';
		return (
			<li className={active}>
				{user.name}
			</li>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired,
	activeUser: React.PropTypes.string.isRequired
}

export default User