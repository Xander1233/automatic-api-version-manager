import {
	FastifyInstance,
	FastifyRequest as Request,
	FastifyReply as Reply
} from 'fastify';

import { Logger } from "@ayanaware/logger";
import * as fs from 'fs';
import path from 'path';
import { EXIT_CODES } from './ExitCodes';

const logger = Logger.get();

export class APIService {
	private port: number;
	private app: FastifyInstance;
	private versions: any[] = [ ];

	public constructor(app: FastifyInstance, options?: { port?: number }) {

		this.port = options?.port ?? Number.parseInt(process.env.PORT ?? "3000");
		this.app = app;

		void this.app.register(require('fastify-multipart'));

		this.initializeVersions();
	}

	private initializeVersions() {
		let directory = '.' + path.sep + 'dist' + path.sep + 'version';

		let apiVersions = fs.readdirSync(directory);
		apiVersions.filter(direct => fs.statSync(directory + path.sep + direct).isDirectory())
			.forEach(dir => fs.readdirSync(directory + path.sep + dir)
				.forEach(direct => {
					apiVersions.push(`${dir}/${direct}`);
				}));

		apiVersions = apiVersions.filter(direct => direct.split('/')[1] === 'api.js');
		if (apiVersions.length < 1) throw new Error(`'${directory}' has no API in it`);

		for (const file of apiVersions) {
			let version = require("./../version/" + file.split(".")[0]);
			version = new version.API(file.split("/")[0], this);
			this.versions.push(version);
		}
	}

	public async listen() {
		try {
			await this.app.listen(this.port, '0.0.0.0');
			logger.info(`Server listening on port *:${this.port}`);
		} catch(_) {
			this.app.log.error(_);
			process.exit(EXIT_CODES.ERROR_ON_LISTENING);
		}
	}

	public get App(): FastifyInstance {
		return this.app;
	}

}
