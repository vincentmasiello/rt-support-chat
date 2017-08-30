import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: []
		};
	}
	addChannel(name) {
		let {channels} = this.state;

		// shorthand sets value of name to 'name' prop
		channels.push({id: channels.length, name});

		// and here same thing
		this.setState({channels});
		// TODO: send this to server
	}
	setChannel(activeChannel) {
		this.setState({activeChannel});
		// TODO: Get Channels Messages from server
	}
	render() {
		return (
			<div className='app'>
				<div className='nav'>
					<ChannelSection
						{...this.state}
						addChannel={this.addChannel.bind(this)}
						setChannel={this.setChannel.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default App