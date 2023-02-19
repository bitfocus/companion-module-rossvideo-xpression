import { FIELDS } from './setup.js'

/**
 * INTERNAL: Get the available actions.
 *
 * @access public
 * @since 1.0.0
 */
export function updateActions() {
	const executeAction = (action) => {
		let opt = action.options
		let fb = 0

		if (opt.fb !== undefined) {
			fb = opt.fb - 1
		}

		switch (action.actionId) {
			case 'CLFB':
				this.sendCommand(`CLFB ${fb}`)
				break
			case 'CLFB_L':
				this.sendCommand(`CLFB ${fb}:${opt.layer}`)
				break
			case 'CUE':
				this.sendCommand(`CUE ${opt.takeID}:${fb}:${opt.layer}`)
				break
			case 'FOCUS':
				this.sendCommand(`FOCUS ${opt.takeID}`)
				break
			case 'GPI':
				let gpi = (opt.gpi > 9 ? '' : '0') + opt.gpi
				this.sendCommand(`GPI ${gpi}`)
				break
			case 'LAYEROFF':
				this.sendCommand(`LAYEROFF ${fb}:${opt.layer}`)
				break
			case 'RESUME':
				this.sendCommand(`RESUME ${fb}`)
				break
			case 'RESUME_L':
				this.sendCommand(`RESUME ${fb}:${opt.layer}`)
				break
			case 'SEQI':
				this.sendCommand(`SEQI ${opt.takeID}:${opt.layer}`)
				break
			case 'SEQO':
				this.sendCommand(`SEQO ${opt.takeID}`)
				break
			case 'SWAP':
				this.sendCommand(`SWAP ${fb}`)
				break
			case 'TAKE':
				this.sendCommand(`TAKE ${opt.takeID}:${fb}:${opt.layer}`)
				break
			case 'UNCUE':
				this.sendCommand(`UNCUE ${opt.takeID}`)
				break
			case 'UPNEXT':
				this.sendCommand(`UPNEXT ${opt.takeID}`)
				break
		}
	}

	this.setActionDefinitions({
		CLRA: {
			name: 'Clear all framebuffers (CLRA)',
			options: [],
			callback: () => {
				this.sendCommand('CRLA')
			},
		},
		CLFB: {
			name: 'Clear framebuffer (CLFB)',
			options: [FIELDS.FRAMEBUFFER],
			callback: (action) => {
				executeAction(action)
			},
		},
		CLFB_L: {
			name: 'Clear layer in framebuffer (CLFB)',
			options: [FIELDS.FRAMEBUFFER, FIELDS.LAYER],
			callback: (action) => {
				executeAction(action)
			},
		},
		SWAP_A: {
			name: 'Load all cued items to all framebuffers (SWAP)',
			options: [],
			callback: () => {
				this.sendCommand('SWAP')
			},
		},
		SWAP: {
			name: 'Load cued items in framebuffer (SWAP)',
			options: [FIELDS.FRAMEBUFFER],
			callback: (action) => {
				executeAction(action)
			},
		},
		SEQI: {
			name: 'Load take item to air on layer (SEQI)',
			options: [FIELDS.TAKEID, FIELDS.LAYER],
			callback: (action) => {
				executeAction(action)
			},
		},
		TAKE: {
			name: 'Load take item to framebuffer layer (TAKE)',
			options: [FIELDS.TAKEID, FIELDS.FRAMEBUFFER, FIELDS.LAYER],
			callback: (action) => {
				executeAction(action)
			},
		},
		DOWN: {
			name: 'Move sequencer focus to next item (DOWN)',
			options: [],
			callback: () => {
				this.sendCommand('DOWN')
			},
		},
		UP: {
			name: 'Move sequencer focus to previous item (UP)',
			options: [],
			callback: () => {
				this.sendCommand('UP')
			},
		},
		CUE: {
			name: 'Ready item into a framebuffer layer (CUE)',
			options: [FIELDS.TAKEID, FIELDS.FRAMEBUFFER, FIELDS.LAYER],
			callback: (action) => {
				executeAction(action)
			},
		},
		UNCUEALL: {
			name: 'Remove all cued items from the cued state (UNCUEALL)',
			options: [],
			callback: () => {
				this.sendCommand('UNCUEALL')
			},
		},
		UNCUE: {
			name: 'Remove take item from the cued state (UNCUE)',
			options: [FIELDS.TAKEID],
			callback: (action) => {
				executeAction(action)
			},
		},
		RESUME: {
			name: 'Resume all layers in framebuffer (RESUME)',
			options: [FIELDS.FRAMEBUFFER],
			callback: (action) => {
				executeAction(action)
			},
		},
		RESUME_L: {
			name: 'Resume layer in framebuffer (RESUME)',
			options: [FIELDS.FRAMEBUFFER, FIELDS.LAYER],
			callback: (action) => {
				executeAction(action)
			},
		},
		UPNEXT: {
			name: 'Set preview to take item (UPNEXT)',
			options: [FIELDS.TAKEID],
			callback: (action) => {
				executeAction(action)
			},
		},
		FOCUS: {
			name: 'Set sequencer focus to take item (FOCUS)',
			options: [FIELDS.TAKEID],
			callback: (action) => {
				executeAction(action)
			},
		},
		LAYEROFF: {
			name: 'Take layer in framebuffer off air (LAYEROFF)',
			options: [FIELDS.FRAMEBUFFER, FIELDS.LAYER],
			callback: (action) => {
				executeAction(action)
			},
		},
		READ: {
			name: 'Take sequencer item to air (READ)',
			options: [],
			callback: () => {
				this.sendCommand('READ')
			},
		},
		NEXT: {
			name: 'Take sequencer item to air and advance next (NEXT)',
			options: [],
			callback: () => {
				this.sendCommand('NEXT')
			},
		},
		SEQO: {
			name: 'Take take item off air (SEQO)',
			options: [FIELDS.TAKEID],
			callback: (action) => {
				executeAction(action)
			},
		},
		GPI: {
			name: 'Trigger simulated GPI (GPI)',
			options: [FIELDS.GPI],
			callback: (action) => {
				executeAction(action)
			},
		},
	})
}
