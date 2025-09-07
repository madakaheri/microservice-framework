import process from 'node:process';
import {serviceFunction} from './utils/service-function.js';
import * as action from './actions/index.js';

const {
	SERVICE_FUNCTION_NAME = 'AWS_STACK_NAME',
} = process.env;

class SDK {
	config = {
		profile: undefined,
		functionName: SERVICE_FUNCTION_NAME,
	};

	constructor() {
		this.configure();
	}

	/**
	 * 初期設定のオーバーライド
	 * @param {Object} config
	 * @param {string} config.profile - AWS profile name
	 * @param {string} config.functionName - lambda function name
	 * @returns {void}
	 */
	configure(config = {}) {
		Object.assign(this.config, config);
		const {profile, functionName} = this.config;
		serviceFunction.configure({
			profile,
			functionName,
		});
	}

	/** OVERRIDE_ACTIONS_START */
	fuga = action.fuga;
	hoge = action.hoge;
	ping = action.ping;
	/** OVERRIDE_ACTIONS_END */
}

export const serviceSDK = new SDK();
export default serviceSDK;
