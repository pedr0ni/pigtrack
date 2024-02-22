import {initQueryClient} from '@ts-rest/react-query';
import {packetContract} from './packet.contract';
import customApi from '../customApi';

export const packetClient = initQueryClient(packetContract, {
  baseUrl: 'http://192.168.15.107:3001/api/packet',
  baseHeaders: {},
  api: customApi,
});
