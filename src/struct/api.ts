import { APIService } from './APIService';

export abstract class APIVersion {

	protected version: string;

	protected app: APIService;

	protected defaultStart: string;

	constructor(version: string, app: APIService) {
		this.version = version;
		this.app = app;
		this.defaultStart = `/api/${version}`;
	}
}
