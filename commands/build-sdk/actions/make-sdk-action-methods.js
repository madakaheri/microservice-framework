import fs from 'node:fs/promises';
import {kekabToCamel} from '../utils/text-transform.js';

const sdkPath = new URL('../../../service-client/src/index.js', import.meta.url).pathname;
const actionPath = new URL('../../../service-client/src/actions', import.meta.url).pathname;

/**
 * serviceClientActionPath 以下の各アクションを SDK クラスにメソッドとして追加するコードを生成
 * - OVERRIDE_ACTIONS_START と OVERRIDE_ACTIONS_END の間に挿入する
 * @return {Promise<string>} 生成したコード
 */
export async function makeSdkActionMethods() {
	const dirents = await fs.readdir(actionPath, {withFileTypes: true});
	const actions = dirents
		.filter(d =>
			d.isFile()
			&& d.name !== 'index.js'
			&& d.name.endsWith('.js')
			&& !d.name.endsWith('.spec.js')
			&& !d.name.endsWith('.test.js'))
		.map(d => ({
			fileName: d.name,
			functionName: kekabToCamel(d.name.replace('.js', '')),
		}));

	const content = actions.map(a => `\t${a.functionName} = action.${a.functionName};`).join('\n');

	const sdkCode = await fs.readFile(sdkPath, 'utf8');
	const updatedSdkCode = sdkCode.replace(
		/\/\/ OVERRIDE_ACTIONS_START[\s\S]*?\/\/ OVERRIDE_ACTIONS_END/,
		`// OVERRIDE_ACTIONS_START\n${content}\n\t// OVERRIDE_ACTIONS_END`,
	);

	await fs.writeFile(sdkPath, updatedSdkCode);

	return content;
}
