require('dotenv').config('../.env');
export const EXPRESS = {
  port: process.env.PORT ?? 3000
};
export const ENV = process.env.ENV ?? 'LOCAL';
