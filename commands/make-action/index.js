import fs from 'node:fs/promises';
import {camelToKebab} from './utils/text-transform.js';

const rootPath = new URL('../..', import.meta.url).pathname;
const serviceActionsPath = new URL(`${rootPath}/service-gateway/src/actions`, import.meta.url).pathname;

export async function main(actionName) {
	if (!actionName) {
		throw new Error('Action name is required!\nUsage: npm run make action <ActionName>');
	}

	if (!/^[a-zA-Z][a-zA-Z\d]*$/.test(actionName)) {
		throw new Error('Action name must be in CamelCase');
	}

	const actionPath = `${serviceActionsPath}/${camelToKebab(actionName)}`;
	const indexJsPath = `${actionPath}/index.js`;
	const content = `
/**
 * ${actionName} action
 * @param {Object} input
 * @returns {Object}
 */
export async function ${actionName}(input) {
	throw new Error('Not implemented');
}
`;
	await fs.mkdir(actionPath, {recursive: true});
	await fs.writeFile(indexJsPath, content.trimStart());

	console.info(`
	✅ Action ${actionName} created.
	👉 You can now implement the action in ${serviceActionsPath}/${actionName}/index.js
`);
}
