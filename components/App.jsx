import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import Socket from '../socket.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			users: [],
			messages: [],
		};
	}
	/*
	 * componentDidMount() 
	 * React lifecycle event
	 * called ONCE after render()
	 * the app is ready to receive event messages
	 */
	componentDidMount() {
		let socket = this.socket = new Socket();
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
		socket.on('channel add', this.onAddChannel.bind(this));
		socket.on('user add', this.onAddUser.bind(this));
		socket.on('user edit', this.onEditUser.bind(this));
		socket.on('user remove', this.onRemoveUser.bind(this));
		socket.on('message add', this.onAddMessage.bind(this));
	}
	onAddMessage(message) {
		let {messagses} = this.state;
		messages.push(message);
		this.setState({messages});
	}
	onAddUser(user) {
		let {users} = this.state;
		users.push(user);
		this.setState({users});
	}
	onEditUser(editUser) {
		let {users} = this.state;
		users = users.map(user => {
			if (editUser.id === user.id) {
				return editUser;
			}
			return user;
		});
	}
	onRemoveUser(removeUser) {
		let {users} = this.state;
		users = users.filter(user => {
			/* return false for the user to be removed, else true. neat! */
			return user.id !== removeUser.id;
		});
		this.setState({users});
	}

	/* connection event handlers */
	onConnect() {
		this.setState({connected: true});
	}
	onDisconnect() {
		this.setState({connected: false});
	}

	onAddChannel(channel) {
		let {channels} = this.state;
		channels.push(channel);
		this.setState({channels});
	}

	/*
	 * addChannel(string name)
	 * user submitted a new channel from ChannelForm
	 */
	addChannel(name) {
		this.socket.emit('channel add', {name});
	}

	setChannel(activeChannel) {
		if (this.state.activeChannel !== activeChannel) {
			this.setState({messages: []});
			this.setState({activeChannel});
		}
		// TODO: send message to server "{user} Joined channel {channel} @ Date.now()"
		// TODO: Get Channel's Messages from server 
	}

	addUser(name) {
		let {users} = this.state;
		//TODO: validate unique username
		const newUser = {id: users.length, name};
		users.push(newUser);
		this.setState({users});
		this.setState({activeUser: newUser});
		// TODO: send to server
	}
	setUser(activeUser) {
		socket.emit('user edit', {name});
	}

	/*
	 * addMessage 
	 */
	addMessage(message) {
		let {activeChannel} = this.state;
		this.socket.emit('message add',
			{channelId: activeChannel.id, body});
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
				<MessageSection
					{...this.state}
					addMessage={this.addMessage.bind(this)}
				/>
			</div>
		)
	}
}

export default App