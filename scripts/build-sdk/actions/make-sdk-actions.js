import fs from 'node:fs/promises';
import {makeSkelton} from './make-skelton.js';

const serviceActionPath = new URL('../../../service/src/actions', import.meta.url).pathname;
const serviceClientActionPath = new URL('../../../service-client/src/actions', import.meta.url).pathname;
const imports = 'import {serviceFunction} from \'../utils/service-function.js\';\n\n';
const overrideMarker = '@OVERRIDE_ME@';

/**
 * serviceClientActionPath 以下に serviceActionPath から各アクションを生成します
 * @return {Promise<void>}
 */
export async function makeSdkActions() {
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
		const sdkCode = imports + skeltonCode.replace(overrideMarker, sdkImplementation);
		// eslint-disable-next-line no-await-in-loop
		await fs.writeFile(`${serviceClientActionPath}/${actionDirectoryName}.js`, sdkCode);
	}
}
