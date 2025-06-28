import path from 'path';
import pino from 'pino';
import fs from 'fs'

const isProd = process.env.NODE_ENV === 'production'

const logDir = path.join(process.cwd(), 'log');
fs.mkdirSync(logDir, { recursive: true })

export const logger = pino({
    level: isProd ? 'info' : 'debug',
    transport: isProd ? undefined : {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
        },
        level: 'info'
    }
});
