import z from 'zod';

export const FormSchema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	middleName: z.string().nonempty(),
	gender: z.string().nonempty(),
	age: z.number().int().positive(),
	email: z.string().email(),
	phone: z
		.number()
		.refine(
			(num: number) => num.toString().startsWith('09') && num.toString().length === 11,
			"Mobile number must be 11 digits and start with '09'"
		),
	address: z.string().nonempty()
});

export type FormSchema = z.infer<typeof FormSchema>;
