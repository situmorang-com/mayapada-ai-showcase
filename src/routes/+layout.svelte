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

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={siteName} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Mayapada AI Initiatives logo and brand card" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteName} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

{@render children()}
