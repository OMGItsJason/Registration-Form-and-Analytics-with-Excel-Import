<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-svh w-svw items-center justify-center">
	{@render children()}
</div>
