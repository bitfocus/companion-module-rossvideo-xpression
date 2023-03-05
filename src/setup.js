export const Fields = {
	FrameBuffer: {
		type: 'number',
		label: 'Framebuffer',
		id: 'fb',
		default: 1,
		min: 1,
		max: 100,
	},
	GPI: {
		type: 'number',
		label: 'GPI',
		id: 'gpi',
		default: 0,
		min: 0,
		max: 9999,
	},
	Layer: {
		type: 'number',
		label: 'Layer',
		id: 'layer',
		default: 0,
		min: -10,
		max: 10,
	},
	TakeId: {
		type: 'number',
		label: 'Take ID',
		id: 'takeID',
		default: 0,
		min: 0,
		max: 9999,
	},
}
