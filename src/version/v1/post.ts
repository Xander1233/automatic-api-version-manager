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

	}

}
