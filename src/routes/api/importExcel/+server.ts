// routes/api/import-records/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ImportRequest {
	data: Array<{
		firstName: string;
		middleName: string;
		lastName: string;
		gender: string;
		email: string;
		phone: string | number;
		age: number;
		address: string;
	}>;
}

interface ImportResponse {
	success: boolean;
	importedRecords?: number;
	totalRecords?: number;
	error?: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { data } = (await request.json()) as ImportRequest;

		if (!Array.isArray(data)) {
			throw new Error('Invalid request data');
		}

		// Process data in batches
		const batchSize = 100;
		let imported = 0;

		for (let i = 0; i < data.length; i += batchSize) {
			const batch = data.slice(i, i + batchSize).map((record) => ({
				...record,
				phone: BigInt(record.phone.toString().replace(/\D/g, '')), // Clean phone number and convert to BigInt
				createdAt: new Date(),
				updatedAt: new Date()
			}));

			await prisma.records.createMany({
				data: batch,
				skipDuplicates: true
			});

			imported += batch.length;
		}

		await prisma.$disconnect();

		const response: ImportResponse = {
			success: true,
			importedRecords: imported,
			totalRecords: data.length
		};

		return json(response);
	} catch (error) {
		console.error('Import error:', error);
		await prisma.$disconnect();

		const errorResponse: ImportResponse = {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error occurred'
		};

		return json(errorResponse, { status: 500 });
	}
};
