<script lang="ts">
	import type { LayoutProps } from './$types';
	import HeaderUser from '$lib/components/HeaderUser.svelte';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import * as Card from '$lib/components/ui/card';
	import TreePineIcon from 'lucide-svelte/icons/tree-pine';

	let { data, children }: LayoutProps = $props();
</script>

<div class="min-h-screen w-screen max-w-screen overflow-x-hidden pb-18">
	<PublicHeader />

	<div class="w-screen max-w-screen px-4">{@render children()}</div>
</div>
