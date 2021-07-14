import fastify, { FastifyInstance } from 'fastify';
import { Logger } from "@ayanaware/logger";
import { APIService } from './struct/APIService';
import { config } from "./options";

const app: FastifyInstance = fastify({ logger: false, trustProxy: true });

const logger = Logger.get('API');

app.addHook("onResponse", (req, res, next) => {
	logger.info(`(ID: ${req.id}) ${req.routerMethod ?? 'N/A'} ${res.statusCode} -> ${req.url} from ${req.ip} ${req.headers['user-agent'] ?? ''}`);
	next();
});

void app.register(require("point-of-view"), {
	engine: {
		ejs: require("ejs")
	}
});

void app.register(require("fastify-cors"), {
	origin: '*'
});

void app.register(require('fastify-multipart'));

if (!(config.ratelimit.threshold < 0 || config.ratelimit.time_window < 0)) {
	void app.register(require('fastify-rate-limit'), {
		global: true,
		max: config.ratelimit.threshold,
		allowList: req => config.ratelimit.whitelist.includes(req),
		timeWindow: config.ratelimit.time_window
	});
}

const API = new APIService(app, {
	port: config.port
});

void API.listen();
