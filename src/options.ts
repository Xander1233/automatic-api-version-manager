require('dotenv').config();

const port = Number.parseInt(process.env.PORT) ?? 3000;
const threshold = Number.parseInt(process.env.RATELIMIT_THRESHOLD) ?? 10;
const timeWindow = Number.parseInt(process.env.RATELIMIT_TIME_WINDOW) ?? 30000;
const whitelist = process.env.RATELIMIT_WHILELISTED_IPS.split(/ +/) ?? [  ];

export const config = {
	ratelimit: {
		threshold: threshold,
		time_window: timeWindow,
		whitelist: whitelist
	},
	port: port,
}
