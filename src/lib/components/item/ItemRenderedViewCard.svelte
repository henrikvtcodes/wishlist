<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import type { Item } from './types';
	import * as ButtonGroup from '$lib/components/ui/button-group';

	import currency from 'currency.js';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		item: Item;
	};

	let { item }: Props = $props();
</script>

<Card class="h-max w-full">
	<CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>

	<CardContent>
		<Badge>{currency(item.priceCents, { fromCents: true }).format()}</Badge>
		<p>{item.description}</p>
	</CardContent>

	<CardFooter>
		{#if item.claimable && item.itemUrl !== undefined}
			<ButtonGroup.Root class="w-full">
				<Button variant="default">Claim</Button>
				<Button variant="secondary">View Item</Button>
			</ButtonGroup.Root>
		{:else}
			{#if item.claimable}
				<Button>Claim</Button>
			{/if}
			{#if item.itemUrl !== undefined}
				<Button>View Item</Button>
			{/if}
		{/if}
	</CardFooter>
</Card>
