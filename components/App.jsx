import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			users: [],
			messages: []
		};
	}
	addChannel(name) {
		let {channels} = this.state;

		// TODO: validate unique channelName
		// shorthand sets value of name to 'name' prop
		channels.push({id: channels.length, name});

		// and here same thing
		this.setState({channels});
		// TODO: send this to server
	}
	setChannel(activeChannel) {
		this.setState({activeChannel});
		// TODO: send message to server "{user} Joined channel {channel} @ Date.now()"
		// TODO: Get Channel's Messages from server (clear old messages)
	}

	addUser(name) {
		let {users} = this.state;
		//TODO: validate unique username
		users.push({id: users.length, name});
		this.setState({users});
		// TODO: send to server
	}
	setUser(activeUser) {
		this.setState({activeUser});
	}

	/* 
	 * removeUser takes a name(string) and removes the corresponding 
	 * user from the list, updating state
	 * 
	 * TODO: would love to write a better data structure but in the 
	 *			context of this simple app that may be overkill.
	 */
	removeUser(name) {
		let {users} = this.props;
		users.find((usr, index) => {
			if (usr.name === name) {
				users.slice(index);
				return true;
			}
			return false;
		});
		this.setState({users});
	}
	render() {
		return (
			<div className='app'>
				<div className='nav'>
					<ChannelSection
						{...this.state}
						addChannel={this.addChannel.bind(this)}
						setChannel={this.setChannel.bind(this)}
					/>
					<UserSection
						{...this.state}
						addUser={this.addUser.bind(this)}
						setUser={this.setUser.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default App