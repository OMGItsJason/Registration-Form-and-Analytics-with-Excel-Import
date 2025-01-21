<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Form from '@/components/ui/form';
	import * as Popover from '@/components/ui/popover';
	import * as Command from '@/components/ui/command';
	import { tick } from 'svelte';
	import { useId } from 'bits-ui';
	import { cn } from '@/utils.js';

	let { form, formData, genderCB } = $props();

	const gender = [
		{ label: 'Male', value: 'Male' },
		{ label: 'Female', value: 'Female' }
	];

	function closeAndFocusTrigger(triggerId: string) {
		genderCB = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const triggerId = useId();
</script>

<Form.Field {form} name="gender">
	<Popover.Root bind:open={genderCB}>
		<Form.Control id={triggerId}>
			{#snippet children({ props })}
				<Form.Label>Gender</Form.Label>
				<Popover.Trigger
					role="combobox"
					{...props}
					class="flex w-48 items-center justify-between rounded-md border p-2 text-start text-muted-foreground md:text-sm"
				>
					{gender.find((f) => f.value === $formData.gender)?.label ?? 'Select Gender'}
					<ChevronsUpDown class="size-4 opacity-50" />
				</Popover.Trigger>
				<input hidden value={$formData.gender} name={props.name} />
			{/snippet}
		</Form.Control>
		<Popover.Content class="w-48 p-0">
			<Command.Root class="w-full">
				<Command.Group>
					{#each gender as gen}
						<Command.Item
							value={gen.value}
							onSelect={() => {
								$formData.gender = gen.value;
								closeAndFocusTrigger(triggerId);
							}}
						>
							{gen.label}
							<Check class={cn(gen.value !== $formData.gender && 'text-transparent')} />
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Form.Field>
