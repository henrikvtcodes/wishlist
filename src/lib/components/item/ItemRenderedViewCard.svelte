<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import type { Item } from './types';

	import currency from 'currency.js';
	import { Button } from '$lib/components/ui/button';
	import { env } from '$lib/env/client';

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
		{#if env.PUBLIC_CLAIMING_ENABLE}
			<Button class="basis-1/2" disabled={item.isClaimed} variant="default"
				>{claimButtonText}</Button
			>
		{/if}
		{#if item.itemUrl !== undefined}
			<Button class="basis-1/2" variant="secondary">
				{#if item.vendorName !== ''}
					See item at {item.vendorName}
				{:else}
					View item
				{/if}
			</Button>
		{/if}
	</CardFooter>
</Card>
