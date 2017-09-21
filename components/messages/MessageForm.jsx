import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component {
	onSubmit(e) {
		e.preventDefault();
		const node = this.refs.message;
		const newMessage = node.value;
		this.props.addMessage(newMessage);
		node.value = '';
	}
	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<div className='form-group'>
					<input 
						className='form-control'
						type='text'
						placeholder='Add Message...'
						ref='message'
					/>
				</div>
			</form>
		)
	}
}

MessageForm.propTypes = {
	addMessage: PropTypes.func.isRequired
}

export default MessageForm