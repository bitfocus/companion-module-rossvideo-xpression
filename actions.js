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
					this.FRAMEBUFFER_FIELD
				]
			},
			'CLFB_L': {
				label: 'Clear layer in framebuffer (CLFB)',
				options: [
					this.FRAMEBUFFER_FIELD,
					this.LAYER_FIELD
				]
			},
			'SWAP_A': { label: 'Load all cued items to all framebuffers (SWAP)' },
			'SWAP': {
				label: 'Load cued items in framebuffer (SWAP)',
				options: [
					this.FRAMEBUFFER_FIELD
				]
			},
			'SEQI': {
				label: 'Load take item to air on layer (SEQI)',
				options: [
					this.TAKEID_FIELD,
					this.LAYER_FIELD
				]
			},
			'TAKE': {
				label: 'Load take item to framebuffer layer (TAKE)',
				options: [
					this.TAKEID_FIELD,
					this.FRAMEBUFFER_FIELD,
					this.LAYER_FIELD
				]
			},
			'DOWN': { label: 'Move sequencer focus to next item (DOWN)' },
			'UP': { label: 'Move sequencer focus to previous item (UP)' },
			'CUE': {
				label: 'Ready item into a framebuffer layer (CUE)',
				options: [
					this.TAKEID_FIELD,
					this.FRAMEBUFFER_FIELD,
					this.LAYER_FIELD
				]
			},
			'RESUME': {
				label: 'Resume all layers in framebuffer (RESUME)',
				options: [
					this.FRAMEBUFFER_FIELD
				]
			},
			'RESUME_L': {
				label: 'Resume layer in framebuffer (RESUME)',
				options: [
					this.FRAMEBUFFER_FIELD,
					this.LAYER_FIELD
				]
			},
			'UPNEXT': {
				label: 'Set preview to take item (UPNEXT)',
				options: [
					this.TAKEID_FIELD
				]
			},
			'FOCUS': {
				label: 'Set sequencer focus to take item (FOCUS)',
				options: [
					this.TAKEID_FIELD
				]
			},
			'LAYEROFF': {
				label: 'Take layer in framebuffer off air (LAYEROFF)',
				options: [
					this.FRAMEBUFFER_FIELD,
					this.LAYER_FIELD
				]
			},
			'READ': { label: 'Take sequencer item to air (READ)' },
			'NEXT': { label: 'Take sequencer item to air and advance next (NEXT)' },
			'SEQO': {
				label: 'Take take item off air (SEQO)',
				options: [
					this.TAKEID_FIELD
				]
			},
			'GPI': {
				label: 'Trigger simulated GPI (GPI)',
				options: [
					this.GPI_FIELD
				]
			}
		};

		return actions;
	}
}