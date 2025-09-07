
/**
 * A simple ping action that responds with a pong message.
 * @param {Object} input - The parameters for the ping action.
 * @param {string} input.person - The name of the person to greet.
 * @param {string} input.text - The text message to include in the response.
 * @returns {Promise<string>} A pong message including the person's name and the text message.
 */
export async function ping(input) {
	const {person, text} = input;
	await new Promise(resolve => {
		setTimeout(resolve, 100);
	});
	return `Pong! Hello, ${person}. You said: ${text}`;
}
