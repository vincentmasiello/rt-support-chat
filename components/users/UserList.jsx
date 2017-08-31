import React, {Component} from 'react';
import User from './User.jsx';

class UserList extends Component {
	render() {
		return(
			<ul>{
				this.props.users.map( usr =>{
					return <User 
						user={usr}
						key={usr.id}
						{...this.props}
					/>
				})
			}</ul>
		)
	}
}

UserList.propTypes = {
	users: React.PropTypes.array.isRequired,
	setUser: React.PropTypes.func.isRequired,
	activeUser: React.PropTypes.func.isRequired
}

export default UserList