import {initContract} from '@ts-rest/core';
import {PacketSchema, createPacketSchema} from './packet.schemas';
import {z} from 'zod';

const c = initContract();

export const packetContract = c.router({
  createPacket: {
    method: 'POST',
    path: '/',
    responses: {
      201: PacketSchema,
    },
    body: createPacketSchema,
    headers: z.object({
      authorization: z.string(),
    }),
  },
});