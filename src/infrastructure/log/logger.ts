import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';
import moment from 'moment-timezone';
import { ENV } from '../../environment';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  const env = ENV || 'development';
  return env === 'development' ? 'debug' : 'http';
};

const logFormat = (info: TransformableInfo): string => {
  const splat = info[Symbol.for('splat')];
  const result_string = JSON.stringify({
    timestamp: moment
      .tz(new Date(), 'America/Santiago')
      .format('DD-MM-YYYY HH:mm:ss'),
    level: info['level'],
    message: info.message,
    data: splat
  });
  return `${result_string}`;
};

export const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.printf(logFormat)
  ),
  level: level(),
  levels,
  transports: [
    new transports.Console({ silent: ENV === 'test', handleExceptions: true })
  ]
});
