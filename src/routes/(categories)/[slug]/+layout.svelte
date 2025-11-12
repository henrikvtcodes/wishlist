<script lang="ts">
	import type { LayoutProps } from './$types';
	import HeaderUser from '@/components/HeaderUser.svelte';
	import PublicHeader from '@/components/PublicHeader.svelte';
	import * as Card from '@/components/ui/card';
	import TreePineIcon from 'lucide-svelte/icons/tree-pine';

	let { data, children }: LayoutProps = $props();
</script>

<div class="min-h-screen w-screen max-w-screen">
	<PublicHeader />

	{@render children()}
</div>
