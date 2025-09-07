import test from 'ava';
import {serviceSDK} from '@madakaheri/service-client';

serviceSDK.configure({
	// profile: 'default',
	functionName: 'my-service',
});

test('hoge', async t => {
	const response = await serviceSDK.hoge('MadakaHeri');
	console.log(response);
	t.pass();
});
