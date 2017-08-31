import React, {Component} from 'react';

class User extends Component {
	onClick(e) {
		e.preventDefault();
		const {setUser, user} = this.props;
		setUser(user);
	}
	render() {
		const {user, activeUser} = this.props;
		const active = (user === activeUser) ? 'active' : '';
		return (
			<li className={active}>
				<a onClick={this.onClick.bind(this)}>
					{user.name}
				</a>
			</li>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired,
	setUser: React.PropTypes.func.isRequired,
	activeUser: React.PropTypes.func.isRequired
}

export default User