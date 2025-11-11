<script lang="ts">
	import type { LayoutProps } from './$types';
	import HeaderUser from '@/components/HeaderUser.svelte';
	import * as Card from '@/components/ui/card';

	let { data, children }: LayoutProps = $props();
</script>

<div class="min-h-screen w-screen max-w-screen">
	<header class="flex w-screen justify-between p-2">
		<!-- <h1>henrik's wishlist</h1>
		<span class="justify-end"><HeaderUser /></span> -->
		<Card.Card class="w-full flex-row p-4"
			><h1 class="shrink-0">henrik's wishlist</h1>
			<div class="flex grow basis-full">
				<h2>category1</h2>
				<h2>category2</h2>
			</div>
			<div class="shrink-0"><HeaderUser /></div>
		</Card.Card>
	</header>

	{@render children()}
</div>
