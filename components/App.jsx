import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
			activeChannel: {},
		};
	}

	/*
	 * componentDidMount() 
	 * 	React lifecycle event
	 * 	called ONCE after render()
	 * 	the app is ready to receive event messages
	 */
	componentDidMount() {
		let ws = new WebSocket('ws://localhost:4000')
		let socket = this.socket = new Socket(ws);

		/* set the event handlers */
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
		socket.on('channel add', this.onAddChannel.bind(this));
		socket.on('channel remove', this.onRemoveChannel.bind(this));
		socket.on('channel edit', this.onEditChannel.bind(this));
		socket.on('user add', this.onAddUser.bind(this));
		socket.on('user edit', this.onEditUser.bind(this));
		socket.on('user remove', this.onRemoveUser.bind(this));
		socket.on('message add', this.onAddMessage.bind(this));
	}

	/********************************
	 * incoming message callbacks 
	 ********************************/

	onConnect() {
		console.log("connected");
		this.setState({connected: true});
		this.socket.emit('channel subscribe');
		this.socket.emit('user subscribe');
	}
	onDisconnect() {
		console.log("disconnected");
		this.setState({connected: false});
	}
	onAddMessage(message) {
		let {messages} = this.state;
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
		this.setState({users});
	}
	onRemoveUser(removeUser) {
		let {users} = this.state;
		users = users.filter(user => {
			return user.id !== removeUser.id;
		});
		this.setState({users});
	}
	onAddChannel(channel) {
		let {channels} = this.state;
		channels.push(channel);
		this.setState({channels});
	}
	onEditChannel(editChannel) {
		let {channels} = this.state;
		channels = channels.map(channel => {
			if (editChannel.id === channel.id) {
				return editChannel;
			}
			return channel;
		});
	}
	onRemoveChannel(removeChannel) {
		let {channels} = this.state;
		channels = channels.filter(channel => {
			return channel.id !== removeChannel.id;
		});
		this.setState({channels});
	}

	/********************************
	 * outgoing message functions 
	 ********************************/

	/*
	 * addChannel(string name)
	 * user submitted a new channel from ChannelForm
	 */
	addChannel(name) {
		this.socket.emit('channel add', {name});
	}

	/* 
	 * setChannel(channel activeChannel)
	 * user clicked a channel name, set activeChannel in state,
	 * unsubscribe from old channel, clear old messages, subscribe
	 * to new channel
	 */
	setChannel(activeChannel) {
		this.setState({activeChannel});
		this.socket.emit('message unsubsribe');
		this.setState({messages: []});
		this.socket.emit('message subscribe', 
			{channelId: activeChannel.id});
	}

	/*
	 * setUser(string name)
	 * 	use socket utility to message server that a new name has 
	 * 	been entered or existing name has been edited.
	 */
	setUser(name) {
		this.socket.emit('user edit', {name});
	}
	
	/*
	 * addMessage 
	 * client entered a new message, send to server through 
	 * socket utility
	 */
	addMessage(body) {
		let {activeChannel} = this.state;
		this.socket.emit('message add', 
			{body, channelId: activeChannel.id});
	}
	/*
	*/
	editChannel(channel) {
		this.socket.emit('channel edit', channel);
	}
	/*
	*/
	deleteChannel(channel) {
		this.socket.emit('channel delete', channel);
	}

	render() {
		return (
			<div className='app'>
				<div className='nav'>
					<ChannelSection
						{...this.state}
						addChannel={this.addChannel.bind(this)}
						setChannel={this.setChannel.bind(this)}
						editChannel={this.editChannel.bind(this)}
						deleteChannel={this.deleteChannel.bind(this)}
					/>
					<UserSection
						{...this.state}
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