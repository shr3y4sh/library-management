import zod from 'zod/v4';

export const LoginSchema = zod.object({
    email: zod.email(),
    password: zod.string().min(6),
});

export const RegistrationSchema = LoginSchema.extend({
    firstName: zod.string(),
    lastName: zod.string(),
});

export type RegisterBody = zod.infer<typeof RegistrationSchema>;

export type LoginBody = zod.infer<typeof LoginSchema>;

export interface User extends RegisterBody {
    id?: string;
    role: 'USER' | 'ADMIN';
}
