<script>
	import HeaderUser from './HeaderUser.svelte';
	import TreePineIcon from 'lucide-svelte/icons/tree-pine';
	import { Card } from '$lib/components/ui/card';
	import { useQuery } from 'convex-svelte';
	import { api } from '$convex/_generated/api';
	import { env } from '$lib/env/client';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from './ui/button';

	const categories = useQuery(api.categories.all, {}, () => ({}));
</script>

<header class="flex w-screen justify-between p-2">
	<Card class="w-full flex-row p-4"
		><a href="/" class="flex items-center"><TreePineIcon class="h-auto w-8" /></a>
		<div class="flex grow basis-full items-center md:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}
					>Categories</DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						{#if categories.data !== null && categories.data !== undefined}
							{#each categories.data as ct}
								<DropdownMenu.Item>
									<a class="underline" href="/{ct.slug}">{ct.name}</a>
								</DropdownMenu.Item>
							{/each}
						{/if}
						<DropdownMenu.Separator />

						<DropdownMenu.Item>
							<a class="underline" href="/donate">Donate</a>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="hidden grow basis-full items-center gap-x-2 *:h-min *:underline md:flex">
			{#if categories.data !== null && categories.data !== undefined}
				{#each categories.data as ct}
					<a href="/{ct.slug}">{ct.name}</a>
				{/each}
			{/if}

			<a href="/donate">Donate</a>
		</div>
		<div class="shrink-0">
			{#if env.PUBLIC_CLAIMING_ENABLE}
				<HeaderUser />
			{/if}
		</div>
	</Card>
</header>
