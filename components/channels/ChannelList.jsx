import React, {Component} from 'react';
import Channel from './Channel.jsx';
import ChannelControl from './ChannelControl.jsx';

class ChannelList extends Component {
	render() {
		return(
			<ul>{
				this.props.channels.map( chan =>{
					// TODO: find out if I need a key for the actual 
					//  	components if I have one on the containing div
					const controlKey = `ck-${chan.id}`;
					const containerKey = `div-${chan.id}`;
					return (
						<div className='channel-container' key={containerKey}>
							<Channel
								channel={chan}
								key={chan.id}
								{...this.props}
							/>
							<ChannelControl 
								channel={chan}
								key={controlKey}
								{...this.props}
							/>
						</div>
					)
				})
			}</ul>
		)
	}
}

ChannelList.propTypes = {
	channels: React.PropTypes.array.isRequired,
	setChannel: React.PropTypes.func.isRequired,
	activeChannel: React.PropTypes.object.isRequired,
	editChannel: React.PropTypes.func.isRequired,
	deleteChannel: React.PropTypes.func.isRequired
}

export default ChannelList