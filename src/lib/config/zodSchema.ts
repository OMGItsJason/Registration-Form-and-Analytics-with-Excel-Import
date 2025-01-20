import z from 'zod';

export const FormSchema = z.object({
	name: z.string().nonempty(),
	gender: z.string().nonempty(),
	age: z.number().int().positive(),
	email: z.string().email(),
	phone: z.number().int().positive()
});

export type FormSchema = z.infer<typeof FormSchema>;
