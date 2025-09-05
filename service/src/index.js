
export async function handler({action, payload}) {
	try {
		// eslint-disable-next-line promise/prefer-await-to-then
		const {default: execute} = await import(`./actions/${action}.js`).catch(error => {
			if (error.code === 'ERR_MODULE_NOT_FOUND') {
				const error = new Error('Not Found');
				error.name = 'RouteError';
				error.statusCode = 404;
				throw error;
			}
		});
		const data = await execute(payload);
		return {
			statusCode: 200,
			data,
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: error.statusCode || 500,
			error: {
				name: error.name || 'UnhandledError',
				message: error.message,
				stack: error.stack,
			},
		};
	}
}
