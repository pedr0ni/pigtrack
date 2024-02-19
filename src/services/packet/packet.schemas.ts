import {z} from 'zod';

export const PacketHistorySchema = z.object({
  date: z.date(),
  location: z.string(),
  status: z.enum([
    'Objeto entregue ao destinatário',
    'Objeto saiu para entrega ao destinatário',
    'Objeto encaminhado',
    'Objeto postado',
  ]),
});

export const PacketSchema = z.object({
  _id: z.string(),
  code: z.string(),
  name: z.string(),
  user: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  history: z.array(PacketHistorySchema),
});
