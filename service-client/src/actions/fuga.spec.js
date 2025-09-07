import test from 'ava';
import {sdk} from '../index.js';

sdk.configure({
	// profile: 'default',
	functionName: 'my-service',
});

test('fuga', async t => {
	const response = await sdk.fuga('MadakaHeri');
	console.log(response);
	t.pass();
});
