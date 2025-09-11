import fs from 'node:fs/promises';
import jsdoc2md from 'jsdoc-to-markdown';
import {kekabToCamel} from './utils/text-transform.js';

const serviceActionPath = new URL('../../service-gateway/src/actions', import.meta.url).pathname;
const docsPath = new URL('../../docs', import.meta.url).pathname;

/**
 * ./docs にアクション別にREADMEを生成
 */
export async function buildDocs() {
	const dirents = await fs.readdir(serviceActionPath, {withFileTypes: true});
	const actions = dirents
		.filter(dirent => dirent.isDirectory())
		.map(d => ({
			functionName: kekabToCamel(d.name.replace('.js', '')),
			codePath: `${serviceActionPath}/${d.name}/index.js`,
		}));

	await fs.mkdir(`${docsPath}`, {recursive: true});
	const docs = await Promise.all(actions.map(async a => {
		const code = await fs.readFile(a.codePath, 'utf8');
		const jsdoc = await jsdoc2md.render({source: code});
		return jsdoc;
	}));

	const header = `# Actions

各アクションの仕様は以下の通りです。
`;
	docs.unshift(header);

	await fs.writeFile(`${docsPath}/actions.md`, docs.join('\n---\n') + '\n');
}
