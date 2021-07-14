import { APIVersion } from '../../struct/api';
import { APIService } from '../../struct/APIService';
import { FastifyInstance, FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { UserRoute } from './users';

export default class API extends APIVersion {

	private instance: FastifyInstance;

	private users: UserRoute;

	constructor(version: string, app: APIService) {
		super(version, app);
		this.instance = this.app.App;

		this.users = new UserRoute(version, app);

		this.instance.get(`${this.defaultStart}`, this.handleMain.bind(this));
	}

	private async handleMain(req: Request, rep: Reply) {
		return {
			status: 200, message: "OK"
		};
	}

}
