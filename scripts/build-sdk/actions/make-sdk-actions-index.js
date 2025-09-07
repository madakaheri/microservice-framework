import fs from 'node:fs/promises';
import {kekabToCamel} from '../utils/text-transform.js';

const actionPath = new URL('../../../service-client/src/actions', import.meta.url).pathname;
const indexJs = `${actionPath}/index.js`;

/**
 * serviceClientActionPath 以下の各アクションをまとめてエクスポートする index.js を生成
 * @return {Promise<string>} 生成したコード
 */
export async function makeSdkActionsIndex() {
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

	const content = actions.map(a => `export * from './${a.fileName}';`).join('\n') + '\n';

	await fs.writeFile(indexJs, content);

	return content;
}
