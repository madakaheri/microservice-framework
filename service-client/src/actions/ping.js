import {serviceFunction} from '../../../utils/service-function.js';

/**
 * A simple ping action that responds with a pong message.
 * @param {Object} input - The parameters for the ping action.
 * @param {string} input.person - The name of the person to greet.
 * @param {string} input.text - The text message to include in the response.
 * @returns {Promise<string>} A pong message including the person's name and the text message.
 */
export async function ping(input) {
	return serviceFunction.post({
		action: 'ping',
		payload: input,
	});
}