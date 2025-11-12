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

	let claimButtonText = $derived.by(() => {
		let text = 'Claim';
		if (!item.claimable) {
			text = 'Not claimable';
		} else if (item.isClaimed) {
			text = 'Item claimed';
		}
		return text;
	});
</script>

<Card class="h-max w-full">
	<CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>

	{#if item.imageUrl !== undefined && item.imageUrl !== null}
		<CardContent>
			<img class="rounded" src={item.imageUrl} alt={`Photo of ${item.name}`} />
		</CardContent>
	{/if}

	<CardContent>
		<Badge>{currency(item.priceCents, { fromCents: true }).format()}</Badge>
		<p>{item.description}</p>
	</CardContent>

	<CardFooter class="flex gap-x-2">
		<Button class="basis-1/2" disabled={item.isClaimed} variant="default">{claimButtonText}</Button>
		{#if item.itemUrl !== undefined}
			<Button class="basis-1/2" variant="secondary">View Item</Button>
		{/if}
	</CardFooter>
</Card>
