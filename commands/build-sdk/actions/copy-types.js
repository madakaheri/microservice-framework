import fs from 'node:fs/promises';

const servicePath = new URL('../../../service-gateway', import.meta.url).pathname;
const sdkPath = new URL('../../../service-client', import.meta.url).pathname;

export async function copyTypes() {
	const dirrents = await fs.readdir(`${servicePath}/src`, {withFileTypes: true});
	const isTypesJs = dirrents.filter(d => d.isFile() && d.name === 'types.js').map(d => d.name).length > 0;
	const isTypesDirectory = dirrents.filter(d => d.isDirectory() && d.name === 'types').map(d => d.name).length > 0;

	if (isTypesJs) {
		await fs.copyFile(
			`${servicePath}/src/types.js`,
			`${sdkPath}/src/types.js`,
		);
	}

	if (isTypesDirectory) {
		await fs.rm(`${sdkPath}/src/types`, {recursive: true, force: true});
		await fs.cp(
			`${servicePath}/src/types`,
			`${sdkPath}/src/types`,
			{recursive: true},
		);
	}
}
