<script lang="ts">
	import '../app.css';
	let { children } = $props();

	const siteName = 'Mayapada AI Initiatives';
	const description =
		'Mayapada AI Initiatives is a strategic portfolio of high-impact AI programs across financial services, healthcare, property, hospitality, retail, and media to drive measurable business transformation.';
	const siteUrl = 'https://mayapada.situmorang.com';
	const ogImage = `${siteUrl}/og-mayapada-ai-initiatives.png`;
</script>

<svelte:head>
	<title>{siteName}</title>
	<meta name="description" content={description} />
</svelte:head>

{@render children()}
