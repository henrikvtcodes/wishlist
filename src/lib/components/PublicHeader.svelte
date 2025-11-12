<script>
	import HeaderUser from './HeaderUser.svelte';
	import TreePineIcon from 'lucide-svelte/icons/tree-pine';
	import { Card } from './ui/card';
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';

	const categories = useQuery(api.categories.all, {}, () => ({}));
</script>

<header class="flex w-screen justify-between p-2">
	<Card class="w-full flex-row p-4"
		><a href="/" class="flex items-center"><TreePineIcon class="h-auto w-8" /></a>
		<div class="links flex grow basis-full items-center gap-x-2 *:h-min *:underline">
			{#if categories.data !== null && categories.data !== undefined}
				{#each categories.data as ct}
					<a href="/{ct.slug}">{ct.name}</a>
				{/each}
			{/if}

			<a href="/donate">Donate</a>
		</div>
		<div class="shrink-0"><HeaderUser /></div>
	</Card>
</header>
