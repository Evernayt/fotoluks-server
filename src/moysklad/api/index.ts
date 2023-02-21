import axios from 'axios';
import { MOYSKLAD_API_URL } from 'src/constants/api';
import AuthAPI from './AuthAPI/AuthAPI';

const $host = axios.create({
  baseURL: MOYSKLAD_API_URL,
});

const $authHost = axios.create({
  baseURL: MOYSKLAD_API_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${process.env.MOYSKLAD_TOKEN}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await AuthAPI.getToken({
        login: process.env.MOYSKLAD_LOGIN,
        password: process.env.MOYSKLAD_PASSWORD,
      })
        .then(() => {
          console.log('[SERVER] MOYSKLAD TOKEN RECEIVED');
        })
        .catch(() => {
          console.log('[SERVER] MOYSKLAD TOKEN NOT RECEIVED');
        });
      console.log('====================================');
      console.log('[SERVER] MOYSKLAD ERROR - GETTING A TOKEN');
      console.log('====================================');
    }
    return error;
  },
);

export { $host, $authHost };
