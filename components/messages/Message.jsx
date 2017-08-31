import React, {Component} from 'react';

class Message extends Component {
	render() {
		// don't think we need the messages to be links unless we need to
		// link the author's name to something (maybe support DMs later)
		const {message} = this.props;
		// TODO: check if messsage.author === activeUser.name, highlight users' 
		// own messages.
		return (
			<li>
				<strong>{message.author}&nbsp;&nbsp;&nbsp;</strong>
				<span>{message.name}</span>
			</li>
		)
	}
}

Message.propTypes = {
	message: React.PropTypes.object.isRequired
}

export default Message