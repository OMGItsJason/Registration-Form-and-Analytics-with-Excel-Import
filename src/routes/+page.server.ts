import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { FormSchema } from '@/config/zodSchema';
import { zod } from 'sveltekit-superforms/adapters';
import Prisma from '@prisma/client';

export const load = (async () => {
	const form = await superValidate(zod(FormSchema));
	return {
		form: form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async (event) => {
		const prisma = new Prisma.PrismaClient();
		const form = await superValidate(event, zod(FormSchema));
		const { firstName, middleName, lastName, gender, age, email, phone, address } = form.data;

		console.log('Firt Name:', firstName);
		console.log('Middle Name:', middleName);
		console.log('Last Name:', lastName);
		console.log('Gender', gender);
		console.log('Age:', age);
		console.log('Email:', email);
		console.log('Phone:', phone);
		console.log('Address:', address);

		await prisma.records.create({
			data: {
				firstName: firstName,
				middleName: middleName,
				lastName: lastName,
				gender: gender,
				age: age,
				email: email,
				phone: phone,
				address: address
			}
		});
	}
};
