module.exports = {

	/**
	 * INTERNAL: Get the available actions.  Utilized by bmd-multiview.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	getActions() {
		var actions = {
			'CLRA': { label: 'Clear all framebuffers (CLRA)' },
			'CLFB': {
				label: 'Clear framebuffer (CLFB)',
				options: [
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					}
				]
			},
			'CLFB_L': {
				label: 'Clear layer in framebuffer (CLFB)',
				options: [
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					},
					{
						type: 'number',
						label: 'Layer',
						id: 'layer',
						default: 0,
						min: -10,
						max: 10
					}
				]
			},
			'SWAP_A': { label: 'Load all cued items to all framebuffers (SWAP)' },
			'SWAP': {
				label: 'Load cued items in framebuffer (SWAP)',
				options: [
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					}
				]
			},
			'SEQI': {
				label: 'Load take item to air on layer (SEQI)',
				options: [
					{
						type: 'number',
						label: 'Take ID',
						id: 'takeID',
						default: 0,
						min: 0,
						max: 9999
					},
					{
						type: 'number',
						label: 'Layer',
						id: 'layer',
						default: 0,
						min: -10,
						max: 10
					}
				]
			},
			'TAKE': {
				label: 'Load take item to framebuffer layer (TAKE)',
				options: [
					{
						type: 'number',
						label: 'Take ID',
						id: 'takeID',
						default: 0,
						min: 0,
						max: 9999
					},
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					},
					{
						type: 'number',
						label: 'Layer',
						id: 'layer',
						default: 0,
						min: -10,
						max: 10
					}
				]
			},
			'DOWN': { label: 'Move sequencer focus to next item (DOWN)' },
			'UP': { label: 'Move sequencer focus to previous item (UP)' },
			'CUE': {
				label: 'Ready item into a framebuffer layer (CUE)',
				options: [
					{
						type: 'number',
						label: 'Take ID',
						id: 'takeID',
						default: 0,
						min: 0,
						max: 9999
					},
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					},
					{
						type: 'number',
						label: 'Layer',
						id: 'layer',
						default: 0,
						min: -10,
						max: 10
					}
				]
			},
			'RESUME': {
				label: 'Resume all layers in framebuffer (RESUME)',
				options: [
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					}
				]
			},
			'RESUME_L': {
				label: 'Resume layer in framebuffer (RESUME)',
				options: [
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					},
					{
						type: 'number',
						label: 'Layer',
						id: 'layer',
						default: 0,
						min: -10,
						max: 10
					}
				]
			},
			'UPNEXT': {
				label: 'Set preview to take item (UPNEXT)',
				options: [
					{
						type: 'number',
						label: 'Take ID',
						id: 'takeID',
						default: 0,
						min: 0,
						max: 9999
					}
				]
			},
			'FOCUS': {
				label: 'Set sequencer focus to take item (FOCUS)',
				options: [
					{
						type: 'number',
						label: 'Take ID',
						id: 'takeID',
						default: 0,
						min: 0,
						max: 9999
					}
				]
			},
			'LAYEROFF': {
				label: 'Take layer in framebuffer off air (LAYEROFF)',
				options: [
					{
						type: 'number',
						label: 'Framebuffer',
						id: 'fb',
						default: 1,
						min: 1,
						max: 100
					},
					{
						type: 'number',
						label: 'Layer',
						id: 'layer',
						default: 0,
						min: -10,
						max: 10
					}
				]
			},
			'READ': { label: 'Take sequencer item to air (READ)' },
			'NEXT': { label: 'Take sequencer item to air and advance next (NEXT)' },
			'SEQO': {
				label: 'Take take item off air (SEQO)',
				options: [
					{
						type: 'number',
						label: 'Take ID',
						id: 'takeID',
						default: 0,
						min: 0,
						max: 9999
					}
				]
			},
			'GPI': {
				label: 'Trigger simulated GPI (GPI)',
				options: [
					{
						type: 'number',
						label: 'GPI',
						id: 'gpi',
						default: 0,
						min: 0,
						max: 9999
					}
				]
			}
		};

		return actions;
	}
}