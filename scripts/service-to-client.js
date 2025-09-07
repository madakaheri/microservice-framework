/**
 * AST（コードの木構造）解析ツール esprima を使って
 * service/src/actions 以下の各アクションのコードから
 * service-client/src/actions 以下に SDK 用のコードを自動生成するスクリプト
 */

import fs from 'node:fs/promises';
import {parseModule} from 'esprima';

const serviceActionPath = new URL('../service/src/actions', import.meta.url).pathname;
const serviceClientActionPath = new URL('../service-client/src/actions', import.meta.url).pathname;
const OverrideMarker = '@OVERRIDE_ME@';

/**
 * 元コードからimport部分と関数実装部分を削除したスケルトンコードを生成
 * - 関数上部のコメントは保持する
 * @param {string} code - 元コード
 * @returns {{functionName: string, paramName: string, code: string}} スケルトンコード
 */
function makeSkelton(code) {
	const ast = parseModule(code, {range: true, comment: true, attachComment: true});
	let functionName = '';
	let parameterName = '';
	let skeltonCode = '';

	const exportFuncNode = ast.body.find(node =>
		node.type === 'ExportNamedDeclaration'
		&& node.declaration
		&& node.declaration.type === 'FunctionDeclaration');

	if (exportFuncNode) {
		functionName = exportFuncNode.declaration.id.name;
		parameterName = exportFuncNode.declaration.params[0]?.name || 'input';
		const funcNode = exportFuncNode.declaration;

		// 関数宣言直前のコメントを抽出
		let commentText = '';
		if (ast.comments && ast.comments.length > 0) {
			const funcStart = exportFuncNode.range[0];
			// 直前のコメントを探す
			const precedingComments = ast.comments.filter(c => c.range[1] <= funcStart);
			if (precedingComments.length > 0) {
				const lastComment = precedingComments.at(-1);
				commentText = code.slice(lastComment.range[0], lastComment.range[1]) + '\n';
			}
		}

		const header = code.slice(exportFuncNode.range[0], funcNode.body.range[0] + 1); // '{'まで
		skeltonCode += commentText + header + `\n\t${OverrideMarker}\n}\n`;
	}

	return {
		functionName,
		paramName: parameterName,
		code: skeltonCode.trim(),
	};
}

const actionDirents = await fs.readdir(serviceActionPath, {withFileTypes: true});
const actionDirectories = actionDirents
	.filter(dirent => dirent.isDirectory())
	.map(dirent => `${serviceActionPath}/${dirent.name}`);

await fs.mkdir(serviceClientActionPath, {recursive: true});

for (const actionDirectory of actionDirectories) {
	const actionDirectoryName = actionDirectory.split('/').pop();
	// eslint-disable-next-line no-await-in-loop
	const code = await fs.readFile(`${actionDirectory}/index.js`, 'utf8');
	const {functionName, paramName, code: skeltonCode} = makeSkelton(code);
	const sdkImplementation = `return serviceFunction.post({
		action: '${functionName}',
		payload: ${paramName},
	});`;
	const sdkCode = 'import {serviceFunction} from \'../utils/service-function.js\';\n\n' + skeltonCode.replace(OverrideMarker, sdkImplementation);
	// eslint-disable-next-line no-await-in-loop
	await fs.writeFile(`${serviceClientActionPath}/${actionDirectoryName}.js`, sdkCode);
}
