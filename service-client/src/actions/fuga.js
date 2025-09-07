import {serviceFunction} from '../../../utils/service-function.js';

/**
 * A simple ping action that responds with a pong message.
 * @param {string} text - The parameters for the ping action.
 * @returns {Promise<string>} A pong message including the person's name and the text message.
 */
export async function fuga(text) {
	return serviceFunction.post({
		action: 'fuga',
		payload: text,
	});
}