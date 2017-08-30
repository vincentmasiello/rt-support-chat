import React, {Component} from 'react'
import ChannelList from './ChannelList.jsx'
import ChannelForm from './ChannelForm.jsx'

class ChannelSection extends Component {
	render() {
		return (
			//can't return sibling components, only a single component
			//wrap them in something

			/* {...this.props}
			 * ~spread operator~
			 * Babel does this. copies the parents properties to the component. neat!
			 */
			<div>
				<ChannelList {...this.props} />
				<ChannelForm {...this.props} />
			</div>
		)
	}
}

ChannelSection.propTypes = {
	channels: React.PropTypes.array.isRequired,
	setChannel: React.PropTypes.func.isRequired,
	addChannel: React.PropTypes.func.isRequired
}

export default ChannelSection