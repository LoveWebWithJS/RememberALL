import { z } from 'zod';

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(
      /^[a-zA-Zа-яА-Я0-9-_]+$/,
      'Ник может включать в себя только русские и английские буквы, цифры, дефисы, нижние подчеркивания'
    ),
  password: z.string().min(1),
});
