import test from 'ava';
import {makeSdkActionMethods} from './make-sdk-action-methods.js';

test('makeSdkActionMethods', async t => {
	const content = await makeSdkActionMethods();
	t.log(content);
	t.pass();
});
