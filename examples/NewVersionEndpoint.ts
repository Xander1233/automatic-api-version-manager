import { FastifyInstance, FastifyReply as Reply, FastifyRequest as Request } from 'fastify';
import { APIVersion } from '../../struct/api';
import { APIService } from '../../struct/APIService';
import fetch from 'node-fetch';

export class UserRoute extends APIVersion {

	private instance: FastifyInstance

	constructor(version: string, app: APIService) {
		super(version, app);

		this.defaultStart = `/api/${version}/user`;

		this.instance = this.app.App;

		/*
		 * this.instance.<method>(`${this.defaultStart}/<endpoint path>`, this.<function-name>.bind(this));
		 *
		 * This is an example on how to connect new functions to an endpoint
		 * The new endpoint will be reachable at "/api/<version (e.g.: v1)>/<Version route (e.g.: users)>/endpoint path"
		 */
	}

	/**
	 * This is a test function. It shows how the functions should be build up
	 * @param req
	 * @param rep
	 * @private
	 */
	private test(req: Request, rep: Reply) {
		return {
			code: 200, message: "OK - User api"
		}
	}
}
