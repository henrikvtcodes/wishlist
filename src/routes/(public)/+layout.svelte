<script lang="ts">
	import type { LayoutProps } from './$types';
	import HeaderUser from '$lib/components/HeaderUser.svelte';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import * as Card from '$lib/components/ui/card';
	import TreePineIcon from 'lucide-svelte/icons/tree-pine';

	let { data, children }: LayoutProps = $props();
</script>

<div
	class="min-h-screen w-screen max-w-screen bg-[url('henrik-widepic.jpg')] bg-top-left bg-no-repeat"
>
	<PublicHeader />

	{@render children()}
</div>
