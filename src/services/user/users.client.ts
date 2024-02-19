import {initQueryClient} from '@ts-rest/react-query';
import {userContract} from './user.contract';

export const userClient = initQueryClient(userContract, {
  baseUrl: 'http://192.168.15.107:3001/api/user',
  baseHeaders: {},
});
