import test from 'ava';
import {sdk} from '../index.js';

sdk.configure({
	// profile: 'default',
	functionName: 'my-service',
});

test('hoge', async t => {
	const response = await sdk.hoge('MadakaHeri');
	console.log(response);
	t.pass();
});
