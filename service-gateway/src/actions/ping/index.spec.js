import test from 'ava';
import {ping} from './index.js';

test('ping action should return correct pong message', async t => {
	const input = {person: 'Alice', text: 'How are you?'};
	const expectedOutput = 'Pong! Hello, Alice. You said: How are you?';
	const result = await ping(input);
	t.is(result, expectedOutput);
});
