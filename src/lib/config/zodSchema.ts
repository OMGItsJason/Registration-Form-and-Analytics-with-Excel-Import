import z from 'zod';

export const FormSchema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	middleName: z.string().nonempty(),
	gender: z.string().nonempty(),
	age: z.number().int().positive(),
	email: z.string().email(),
	phone: z.number().int().positive(),
	address: z.string().nonempty()
});

export type FormSchema = z.infer<typeof FormSchema>;
