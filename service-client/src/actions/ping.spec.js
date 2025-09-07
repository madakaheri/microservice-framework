import test from 'ava';
import {sdk} from '../index.js';

sdk.configure({
	// profile: 'default',
	functionName: 'my-service',
});

test('ping action', async t => {
	const response = await sdk.ping({
		person: 'Alice',
		text: 'Hello, World!',
	});
	console.log(response);
	t.pass();
});
