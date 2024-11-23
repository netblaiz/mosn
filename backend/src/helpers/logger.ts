import winston from 'winston'
winston.format.combine(
	winston.format.colorize(),
	winston.format.json())

export const logger = winston.createLogger(
		{
			level: 'info',
			format: winston.format.json(),
			defaultMeta: {
				service: 'user-service',
				time: Date.now().toString()},
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({ filename: 'logs/error.log', level: 'error'
				}),
				new winston.transports.File({ filename: 'logs/combined.log' }),
				],
		})