import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

class MessageSection extends Component {
	render() {
		const {activeChannel} = this.props;
		const heading = (activeChannel != null) ? activeChannel.name : 'No Channel Selected';
		return (
			<div className='messages-container panel panel-default'>
				<div className='panel-heading'>
					<strong>{heading}</strong>
				</div>
				<div className='panel-body messages'>
					<MessageList {...this.props} />
					<MessageForm {...this.props} />
				</div>
			</div>
		)
	}
}

MessageSection.propTypes = {
	messages: PropTypes.array.isRequired,
	addMessage: PropTypes.func.isRequired,
	activeChannel: PropTypes.object.isRequired
}

export default MessageSection