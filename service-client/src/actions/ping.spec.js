import test from 'ava';
import {serviceSDK} from '@madakaheri/service-client';

serviceSDK.configure({
	// profile: 'default',
	functionName: 'my-service',
});

test('ping action', async t => {
	const response = await serviceSDK.ping({
		person: 'Alice',
		text: 'Hello, World!',
	});
	console.log(response);
	t.pass();
});
