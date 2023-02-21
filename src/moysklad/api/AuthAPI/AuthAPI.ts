import { $host } from '..';
import { GetTokenDto } from './dto/get-token.dto';

export default class AuthAPI {
  static async getToken(
    getTokenDto: GetTokenDto,
  ): Promise<{ access_token: string }> {
    const logpas = `${getTokenDto.login}:${getTokenDto.password}`;
    const basicAuth = 'Basic ' + Buffer.from(logpas).toString('base64');

    const { data } = await $host.post(
      'security/token',
      {},
      { headers: { Authorization: basicAuth } },
    );
    process.env.MOYSKLAD_TOKEN = data.access_token;
    return data.access_token;
  }
}
