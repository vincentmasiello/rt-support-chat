import React, {Component} from 'react';

class Message extends Component {
	render() {
		const {message} = this.props;
		// const fmtDate = new Date(message.createdAt).toLocaleDateString(undefined, {
  //   	day: '2-digit',
  //   	month: '2-digit',
  //   	year: 'numeric',
  //   	hour: '2-digit',
  //   	minute: '2-digit',
  //   	second: '2-digit'
		// });

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