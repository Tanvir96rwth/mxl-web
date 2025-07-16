<script lang="ts">
	import * as config from '$lib/config';
	import '../app.css';

	import Navbar from '$lib/Navbar.svelte';
	import OneColumnLayout from '$lib/Page.svelte';

	let { children } = $props();
</script>

<!-- SEO -->
<svelte:head>
	<meta name="description" content={config.description} />
	<meta property="og:title" content={config.title} />
	<meta property="og:description" content={config.description} />
	<meta property="og:url" content={config.url} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<OneColumnLayout
	><Navbar>
		<li><a href="/">Home</a></li>
	</Navbar>
	{@render children()}
</OneColumnLayout>
