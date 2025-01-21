<script lang="ts">
	import Form from '@/components/containers/form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-5">
	<h1 class="text-center text-4xl font-extrabold">Registration Form</h1>
	<Form {data} />
</div>
