import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChannelControl extends Component {
	onClick(e) {
		e.preventDefault(); 
		const {deleteChannel, editChannel, channel} = this.props;
		const control = e.target.title;
		if (control === 'delete') {
			deleteChannel(channel);
		} else if (control === 'edit') {
			editChannel(channel);
		} else {
			console.log('failure: ' + e.target);
		}
	}
	render() {
		const {channel, activeChannel} = this.props;
		const hidden = activeChannel.id === channel.id ? '' : 'hidden';
		const className = hidden + ' channel-control';
		return(
			<div className={className}>
				<button
					className='btn btn-warning btn-xs'
					type='button'
					title='edit'
					onClick={this.onClick.bind(this)}
				>e</button>
				<button
					className='btn btn-danger btn-xs'
					type='button'
					title='delete'
					onClick={this.onClick.bind(this)}
				>x</button>
			</div>
		)
	}
}

ChannelControl.propTypes = {
	editChannel: PropTypes.func.isRequired,
	deleteChannel: PropTypes.func.isRequired,
	channel: PropTypes.object.isRequired
}

export default ChannelControl