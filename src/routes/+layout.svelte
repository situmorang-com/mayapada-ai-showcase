<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Mayapada Group — AI Transformation Showcase</title>
	<meta name="description" content="Exploring how AI can transform Indonesia's Mayapada Group across banking, healthcare, property, hospitality, retail, and media." />
</svelte:head>

{@render children()}
