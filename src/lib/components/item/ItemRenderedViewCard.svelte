<script lang="ts">
	import Badge from '../ui/badge/badge.svelte';
	import { Card, CardHeader, CardTitle } from '../ui/card';
	import CardContent from '../ui/card/card-content.svelte';
	import type { Item } from './types';

	import currency from 'currency.js';

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
</Card>
