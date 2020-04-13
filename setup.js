module.exports = {

	FRAMEBUFFER_FIELD: {
		type: 'number',
		label: 'Framebuffer',
		id: 'fb',
		default: 1,
		min: 1,
		max: 100
	},
	GPI_FIELD: {
		type: 'number',
		label: 'GPI',
		id: 'gpi',
		default: 0,
		min: 0,
		max: 9999
	},
	LAYER_FIELD: {
		type: 'number',
		label: 'Layer',
		id: 'layer',
		default: 0,
		min: -10,
		max: 10
	},
	TAKEID_FIELD: {
		type: 'number',
		label: 'Take ID',
		id: 'takeID',
		default: 0,
		min: 0,
		max: 9999
	}
}