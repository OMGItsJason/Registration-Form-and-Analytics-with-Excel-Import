<script lang="ts">
	import Form from '@/components/containers/form.svelte';
	import { Button } from '@/components/ui/button';
	import type { PageData } from './$types';
	import * as XLSX from 'xlsx';

	let { data }: { data: PageData } = $props();

	interface StatusMessage {
		message: string;
		type: 'success' | 'error' | 'info';
	}

	interface ImportResponse {
		success: boolean;
		importedRecords?: number;
		totalRecords?: number;
		error?: string;
	}

	// Component state
	let fileInput: HTMLInputElement;
	let importing: boolean = $state(false);
	let status: StatusMessage = $state({ message: '', type: 'info' });
	let progress: number = $state(0);

	// Validation functions
	const validateEmail = (email: string): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const validatePhone = (phone: string): boolean => {
		return /^\d{10,}$/.test(phone.toString().replace(/\D/g, ''));
	};

	const validateAge = (age: number): boolean => {
		return !isNaN(age) && age > 0 && age < 150;
	};

	const validateRecord = (record: any): { isValid: boolean; errors: string[] } => {
		const errors: string[] = [];

		// Map Excel columns to our fields
		const mappedRecord = {
			firstName: record['First Name'],
			middleName: record['Middle Name'],
			lastName: record['Last Name'],
			gender: record['Gender'],
			email: record['Email'],
			phone: record['Phone Number'],
			age: record['Age'],
			address: record['Address']
		};

		if (!mappedRecord.firstName?.trim()) errors.push('First Name is required');
		if (!mappedRecord.middleName?.trim()) errors.push('Middle Name is required');
		if (!mappedRecord.lastName?.trim()) errors.push('Last Name is required');
		if (!mappedRecord.gender?.trim()) errors.push('Gender is required');
		if (!mappedRecord.email?.trim() || !validateEmail(mappedRecord.email))
			errors.push('Valid Email is required');
		if (!mappedRecord.phone || !validatePhone(mappedRecord.phone.toString()))
			errors.push('Valid Phone Number is required');
		if (!mappedRecord.age || !validateAge(Number(mappedRecord.age)))
			errors.push('Valid Age is required');
		if (!mappedRecord.address?.trim()) errors.push('Address is required');

		return {
			isValid: errors.length === 0,
			errors
		};
	};

	const transformRecord = (record: any) => {
		return {
			firstName: record['First Name'],
			middleName: record['Middle Name'],
			lastName: record['Last Name'],
			gender: record['Gender'],
			email: record['Email'],
			phone: record['Phone Number'].toString().replace(/\D/g, ''),
			age: Number(record['Age']),
			address: record['Address']
		};
	};

	async function importExcelData(file: File): Promise<void> {
		try {
			importing = true;
			status = { message: 'Reading file...', type: 'info' };
			progress = 10;

			const reader = new FileReader();

			reader.onload = async (e: ProgressEvent<FileReader>) => {
				try {
					if (!e.target?.result) throw new Error('Failed to read file');

					const data = e.target.result;
					const workbook = XLSX.read(data, { type: 'array' });
					const sheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[sheetName];
					const jsonData = XLSX.utils.sheet_to_json(worksheet);

					progress = 30;
					status = { message: 'Validating data...', type: 'info' };

					// Validate all records
					const validRecords = [];
					for (let i = 0; i < jsonData.length; i++) {
						const validation = validateRecord(jsonData[i]);
						if (!validation.isValid) {
							throw new Error(`Row ${i + 2}: ${validation.errors.join(', ')}`);
						}
						validRecords.push(transformRecord(jsonData[i]));
					}

					progress = 50;
					status = { message: 'Processing data...', type: 'info' };

					// Send data to API endpoint
					const response = await fetch('/api/importExcel', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ data: validRecords })
					});

					const result: ImportResponse = await response.json();

					if (result.success) {
						progress = 100;
						status = {
							message: `Successfully imported ${result.importedRecords} records!`,
							type: 'success'
						};
					} else {
						throw new Error(result.error || 'Unknown error occurred');
					}
				} catch (error) {
					status = {
						message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
						type: 'error'
					};
					progress = 0;
				}
			};

			reader.readAsArrayBuffer(file);
		} catch (error) {
			status = {
				message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
				type: 'error'
			};
			progress = 0;
		} finally {
			importing = false;
		}
	}

	function handleFileSelect(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			if (
				file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
				file.type === 'application/vnd.ms-excel'
			) {
				importExcelData(file);
			} else {
				status = {
					message: 'Please select a valid Excel file (.xlsx or .xls)',
					type: 'error'
				};
			}
		}
	}
</script>

<div class="space-y-5">
	<h1 class="text-center text-4xl font-extrabold">Registration Form</h1>
	<Form {data} />
	<div class="flex gap-5">
		<input
			type="file"
			name="excelFileInput"
			id="excelFileInput"
			accept=".xlsx,.xls"
			onchange={handleFileSelect}
			class="hidden-input"
			bind:this={fileInput}
		/>
		<Button type="button" variant="outline">Import</Button>

		<label for="excel-file-input" class="import-button">
			<button disabled={importing} class="btn primary" onclick={() => fileInput.click()}>
				{importing ? 'Importing...' : 'Import Excel File'}
			</button>
		</label>

		{#if progress > 0}
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>
		{/if}

		{#if status.message}
			<div class="alert {status.type}">
				{status.message}
			</div>
		{/if}
		<Button variant="outline">Export</Button>
	</div>
</div>
