import test from 'ava';
import {serviceSDK} from '@madakaheri/service-client';

serviceSDK.configure({
	// profile: 'default',
	functionName: 'my-service',
});

test('fuga', async t => {
	const response = await serviceSDK.fuga('MadakaHeri');
	console.log(response);
	t.pass();
});
