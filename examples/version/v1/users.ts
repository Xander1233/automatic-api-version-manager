import { FastifyInstance, FastifyReply as Reply, FastifyRequest as Request } from 'fastify';
import { APIVersion } from '../../struct/api';
import { APIService } from '../../struct/APIService';
import fetch from 'node-fetch';

export class UserRoute extends APIVersion {

	private instance: FastifyInstance

	private databaseUrl = 'http://localhost:3001';
	private authUrl = 'http://localhost:3002';

	constructor(version: string, app: APIService) {
		super(version, app);

		this.defaultStart = `/api/${version}/user`;

		this.instance = this.app.App;

		this.instance.get(`${this.defaultStart}/@me`, this.getCurrentUser().bind(this));
	}

	private async getCurrentUser(req: Request, rep: Reply) {
		if (!req.headers.authorization) {
			rep.header('Content-Type', 'text/plain');
			rep.status(401);

			return 'Unauthorized';
		}

		let authorization = req.headers.authorization;

		let authorized: { authorized: boolean, accountId: string };

		try {
			authorized = await (await fetch(`${this.authUrl}/authenticate`, { headers: { authorization }, method: "get" })).json();
		} catch( e ) {
			if (e) {
				rep.header('Content-Type', 'text/plain');
				rep.status(401);

				return 'Unauthorized';
			}
		}
	}
}
