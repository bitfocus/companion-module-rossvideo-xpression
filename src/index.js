import { InstanceBase, Regex, runEntrypoint, TCPHelper } from '@companion-module/base'
import { updateActions } from './actions.js'
/**
 * Companion instance class for Ross Video Xpression.
 *
 * @extends InstanceBase
 * @version 1.0.0
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class RossvideoXpressionInstance extends InstanceBase {
	/**
	 * Create an instance of an Xpression module.
	 *
	 * @param {Object} internal - Companion internals
	 * @since 1.0.0
	 */
	constructor(internal) {
		super(internal)

		this.updateActions = updateActions.bind(this)
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value:
					'For additional help with Xpression commands, please reference <a href="https://help.rossvideo.com/acuity-device/Topics/Protocol/External/XPN/RT-XPN-Comm.html" target="_blank">this guide</a>.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'XPression IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'XPression Port',
				width: 4,
				regex: Regex.PORT,
				default: '7788',
			},
		]
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		this.log('debug', 'destroy', this.id)
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @param {Object} config - the configuration
	 * @access public
	 * @since 1.0.0
	 */
	async init(config) {
		this.config = config

		this.updateActions()
		this.initTCP()
	}

	/**
	 * INTERNAL: use setup data to initalize the tcp socket object.
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	initTCP() {
		var receivebuffer = ''

		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		if (this.config.host && this.config.port) {
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})

			this.socket.on('error', (err) => {
				this.log('error', 'Network error: ' + err.message)
			})

			this.socket.on('connect', () => {
				this.log('debug', 'Connected')
			})

			// separate buffered stream into lines with responses
			this.socket.on('data', (chunk) => {
				var i = 0,
					line = '',
					offset = 0
				receivebuffer += chunk

				while ((i = receivebuffer.indexOf('\n', offset)) !== -1) {
					line = receivebuffer.substr(offset, i - offset)
					offset = i + 1

					this.socket.emit('receiveline', line.toString())
				}

				receivebuffer = receivebuffer.substr(offset)
			})

			this.socket.on('receiveline', (line) => {
				//eventually do something
			})
		}
	}

	/**
	 * Send a command string to the socket
	 *
	 * @param {string} cmd - the command
	 * @access public
	 * @since 2.0.0
	 */
	sendCommand(cmd) {
		if (cmd !== undefined) {
			if (this.socket !== undefined && this.socket.isConnected) {
				this.log('debug', `Sent string: ${cmd}`)
				this.socket.send(cmd + '\r\n')
			} else {
				this.log('debug', `Socket not connected: ${cmd}`)
			}
		}
	}

	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.0.0
	 */
	async configUpdated(config) {
		var resetConnection = false

		if (this.config.host != config.host) {
			resetConnection = true
		}

		this.config = config

		this.updateActions()

		if (resetConnection === true || this.socket === undefined) {
			this.initTCP()
		}
	}
}

runEntrypoint(RossvideoXpressionInstance, [])
