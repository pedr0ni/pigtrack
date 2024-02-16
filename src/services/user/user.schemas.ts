import {z} from 'zod';

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
});

export const CreateUserSchema = z.object({
  name: z.string({required_error: 'Digite seu nome.'}),
  phone: z.string({required_error: 'Digite seu telefone.'}),
  email: z
    .string({required_error: 'Digite seu e-mail'})
    .email({message: 'Digite um e-mail válido.'}),
  password: z.string({required_error: 'Digite sua senha.'}),
});

export const LoginSchema = z.object({
  email: z
    .string({required_error: 'Digite seu e-mail'})
    .email({message: 'Digite um e-mail válido.'}),
  password: z.string({required_error: 'Digite sua senha.'}),
});
