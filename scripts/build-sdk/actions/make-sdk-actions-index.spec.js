import test from 'ava';
import {makeSdkActions} from './make-sdk-actions-index.js';

test('makeSdkActions should generate correct SDK action code', async t => {
	const content = await makeSdkActions();
	t.log(content);
	t.pass();
});

