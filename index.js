var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');

var actions       = require('./actions');
var setup         = require('./setup');
var debug;
var log;

/**
 * Companion instance class for Ross Video Xpression.
 *
 * @extends instance_skel
 * @version 1.0.0
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class instance extends instance_skel {

	/**
	 * Create an instance of an Xpression module.
	 *
	 * @param {EventEmitter} system - the brains of the operation
	 * @param {string} id - the instance ID
	 * @param {Object} config - saved user configuration parameters
	 * @since 1.0.0
	 */
	constructor(system,id,config) {
		super(system,id,config);

		Object.assign(this, {
			...actions,
			...setup
		});

		this.actions();
	}

	/**
	 * Setup the actions.
	 *
	 * @param {EventEmitter} system - the brains of the operation
	 * @access public
	 * @since 1.0.0
	 */
	actions(system) {
		this.setActions(this.getActions());
	}

	/**
	 * Executes the provided action.
	 *
	 * @param {Object} action - the action to be executed
	 * @access public
	 * @since 1.0.0
	 */
	action(action) {
		let opt = action.options;
		let cmd = '';
		let fb = 0;

		if (opt.fb !== undefined) {
			fb = opt.fb - 1;
		}

		switch (action.action) {
			case 'CLFB':
				cmd = `CLFB ${fb}`;
				break;
			case 'CLFB_L':
				cmd = `CLFB ${fb}:${opt.layer}`;
				break;
			case 'CLRA':
				cmd = `CLRA`;
				break;
			case 'CUE':
				cmd = `CUE ${opt.takeID}:${fb}:${opt.layer}`;
				break;
			case 'DOWN':
				cmd = `DOWN`;
				break;
			case 'FOCUS':
				cmd = `FOCUS ${opt.takeID}`;
				break;
			case 'GPI':
				let gpi = (opt.gpi > 9 ? '' : '0') + opt.gpi;
				cmd = `GPI ${gpi}`;
				break;
			case 'LAYEROFF':
				cmd = `LAYEROFF ${fb}:${opt.layer}`;
				break;
			case 'NEXT':
				cmd = `NEXT`;
				break;
			case 'READ':
				cmd = `READ`;
				break;
			case 'RESUME':
				cmd = `RESUME ${fb}`;
				break;
			case 'RESUME_L':
				cmd = `RESUME ${fb}:${opt.layer}`;
				break;
			case 'SEQI':
				cmd = `SEQI ${opt.takeID}:${opt.layer}`;
				break;
			case 'SEQO':
				cmd = `SEQO ${opt.takeID}`;
				break;
			case 'SWAP':
				cmd = `SWAP ${fb}`;
				break;
			case 'SWAP_A':
				cmd = `SWAP`;
				break;
			case 'TAKE':
				cmd = `TAKE ${opt.takeID}:${fb}:${opt.layer}`;
				break;
			case 'UNCUEALL':
				cmd = `UNCUEALL`;
				break;
			case 'UNCUE':
				cmd = `UNCUE ${opt.takeID}`;
				break;
			case 'UP':
				cmd = `UP`;
				break;
			case 'UPNEXT':
				cmd = `UPNEXT ${opt.takeID}`;
				break;
		}

		if (cmd !== undefined) {

			if (this.socket !== undefined && this.socket.connected) {
				this.socket.send(cmd + '\r\n');
			}
			else {
				this.debug('Socket not connected :(');
			}
		}
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'For additional help with Xpression commands, please reference <a href="http://help.rossvideo.com/carbonite-device/Topics/Protocol/RossTalk/XPN/RT-XPN-Comm.html" target="_new">this guide</a>.'
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'XPression IP',
				width: 8,
				regex: this.REGEX_IP
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'XPression Port',
				width: 4,
				regex: this.REGEX_PORT,
				default: '7788'
			}
		]
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
		}

		this.debug("destroy", this.id);;
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	init() {
		debug = this.debug;
		log = this.log;

		this.initTCP();
	}

	/**
	 * INTERNAL: use setup data to initalize the tcp socket object.
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	initTCP() {
		var receivebuffer = '';

		if (this.socket !== undefined) {
			this.socket.destroy();
			delete this.socket;
		}

		if (this.config.host && this.config.port) {
			this.socket = new tcp(this.config.host, this.config.port);

			this.socket.on('status_change', (status, message) => {
				this.status(status, message);
			});

			this.socket.on('error', (err) => {
				this.debug("Network error", err);
				this.log('error',"Network error: " + err.message);
			});

			this.socket.on('connect', () => {
				this.debug("Connected");
			});

			// separate buffered stream into lines with responses
			this.socket.on('data', (chunk) => {
				var i = 0, line = '', offset = 0;
				receivebuffer += chunk;

				while ( (i = receivebuffer.indexOf('\n', offset)) !== -1) {
					line = receivebuffer.substr(offset, i - offset);
					offset = i + 1;

					this.socket.emit('receiveline', line.toString());
				}

				receivebuffer = receivebuffer.substr(offset);
			});

			this.socket.on('receiveline', (line) => {
				//eventually do something
			});
		}
	}

	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.0.0
	 */
	updateConfig(config) {
		var resetConnection = false;

		if (this.config.host != config.host)
		{
			resetConnection = true;
		}

		this.config = config;

		this.actions();

		if (resetConnection === true || this.socket === undefined) {
			this.initTCP();
		}
	}
}

exports = module.exports = instance;