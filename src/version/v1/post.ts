import { FastifyInstance, FastifyReply as Reply, FastifyRequest as Request } from 'fastify';
import { APIVersion } from '../../struct/api';
import { APIService } from '../../struct/APIService';
import fetch from 'node-fetch';

export class SubscriptionRoute extends APIVersion {

	private instance: FastifyInstance;

	private databaseUrl = 'http://localhost:3001';

	constructor(version: string, app: APIService) {
		super(version, app);

		this.defaultStart = `/api/${version}/subscriptions`;

		this.instance = this.app.App;


	}

	private async getPosts(req: Request, rep: Reply) {

		let requestor = req.headers.authorization ?? null;

		if (!requestor) {
			rep.status(401);
			return { code: 401, message: 'Unauthorized' };
		}

		const databaseAuthResult = await fetch(`${this.databaseUrl}/`)

		const query = (<any> req.query).query ?? '@me';






	}

}
