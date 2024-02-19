import {initContract} from '@ts-rest/core';
import {CreateUserSchema, LoginSchema, UserSchema} from './user.schemas';
import {PacketSchema} from '../packet/packet.schemas';
import {z} from 'zod';

const c = initContract();

export const userContract = c.router({
  createUser: {
    method: 'POST',
    path: '/',
    responses: {
      201: UserSchema,
    },
    body: CreateUserSchema,
  },
  login: {
    method: 'POST',
    path: '/login',
    responses: {
      200: UserSchema,
    },
    body: LoginSchema,
  },
  getPackets: {
    method: 'GET',
    path: '/:id/packets',
    responses: {
      200: z.array(PacketSchema),
    },
  },
});
