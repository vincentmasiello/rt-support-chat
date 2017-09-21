import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
	message: PropTypes.object.isRequired
}

export default Message