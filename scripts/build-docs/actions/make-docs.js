import fs from 'node:fs/promises';
import {kekabToCamel} from '../utils/text-transform.js';

const actionPath = new URL('../../../service-client/src/actions', import.meta.url).pathname;
const docsPath = new URL('../../../docs', import.meta.url).pathname;

/**
 * ./docs にアクション別にREADMEを生成
 */
export async function makeDocs() {
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

	await fs.mkdir(`${docsPath}/actions`, {recursive: true});
	await Promise.all(actions.map(async a => {
		const docPath = `${docsPath}/actions/${a.functionName}.md`;
		// eslint-disable-next-line promise/prefer-await-to-then
		if (await fs.stat(docPath).catch(() => false)) {
			// 既に存在する場合は上書きしない
			return;
		}

		const content = `# ${a.functionName}

ほとんどの情報は実装のJSDocコメントに記載できます。  
ここにはJSDocコメントに書ききれない仕様を記載して下さい。
`;
		await fs.writeFile(docPath, content);
	}));
}
