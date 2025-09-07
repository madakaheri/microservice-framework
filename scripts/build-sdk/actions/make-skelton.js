import {parseModule} from 'esprima';

const OverrideMarker = '@OVERRIDE_ME@';

/**
 * 元コードからimport部分と関数実装部分を削除したスケルトンコードを生成
 * - 関数上部のコメントは保持する
 * @param {string} code - 元コード
 * @returns {{functionName: string, paramName: string, code: string}} スケルトンコード
 */
export function makeSkelton(code) {
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
		code: skeltonCode,
	};
}
