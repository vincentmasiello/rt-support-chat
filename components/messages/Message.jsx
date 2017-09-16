import React, {Component} from 'react';

class Message extends Component {
	render() {
		const {message} = this.props;

		return (
			<li className='message'>
				<strong className='author'>{message.author}</strong>
				<small className='timestamp'>{message.createdAt}</small><br />
				<span className='body'>{message.body}</span>
			</li>
		)
	}
}

Message.propTypes = {
	message: React.PropTypes.object.isRequired
}

export default Message