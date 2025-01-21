<script lang="ts">
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { FormSchema } from '@/config/zodSchema';
	import Gender from '@/components/containers/genderCb.svelte';

	let { data } = $props();
	let genderCB: string = '';

	const form = superForm(data.form, {
		validators: zodClient(FormSchema),
		async onResult({ result }) {
			if (result.type === 'error') {
			} else if (result.type === 'success') {
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<div class="absolute -top-4 left-1 w-96">
	<SuperDebug data={$formData} />
</div>

<form method="POST" use:enhance class="grid grid-cols-3 gap-3">
	<Form.Field {form} name="firstName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>First Name</Form.Label>
				<Input {...props} bind:value={$formData.firstName} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="middleName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Middle Name</Form.Label>
				<Input {...props} bind:value={$formData.middleName} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Last Name</Form.Label>
				<Input {...props} bind:value={$formData.lastName} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Gender {form} {formData} {genderCB} />
	<Form.Field {form} name="age">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Age</Form.Label>
				<Input type="number" min="0" {...props} bind:value={$formData.age} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="phone">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Phone Number</Form.Label>
				<Input type="number" min="0" {...props} bind:value={$formData.phone} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="address" class="col-span-2">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Address</Form.Label>
				<Input {...props} bind:value={$formData.address} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button formaction="?/register" class="col-start-3">Register</Form.Button>
</form>
