import React, {Component} from 'react';

class Message extends Component {
	render() {
		// don't think we need the messages to be links unless we need to
		// link the author's name to something (maybe support DMs later)
		const {message} = this.props;
		// TODO: check if messsage.author === activeUser.name, highlight users' 
		// own messages.
		const msgDate = new Date(message.timestamp).toLocaleDateString(undefined, {
    	day: '2-digit',
    	month: '2-digit',
    	year: 'numeric',
    	hour: '2-digit',
    	minute: '2-digit',
    	second: '2-digit'
		});

		return (
			<li className='message'>
				<strong className='author'>{message.author.name}</strong>
				<small className='timestamp'>{msgDate}</small><br />
				<span className='body'>{message.message}</span>
			</li>
		)
	}
}

Message.propTypes = {
	message: React.PropTypes.object.isRequired
}

export default Message