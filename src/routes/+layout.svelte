<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PersistQueryClientProvider } from '@tanstack/svelte-query-persist-client';
	import { Toaster } from '@/components/ui/sonner';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
	import { browser } from '$app/environment';
	import { MutationCache, QueryCache, QueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';

	let { children } = $props();

	const queryCache = new QueryCache({
		onError: (error, query) => {
			toast.error('Failed to fetch data', {
				description: error.message
			});
		}
	});

	const mutationCache = new MutationCache({
		onError: (error, mutation) => {
			toast.error('Failed to perform action', {
				description: error.message
			});
		}
	});

	const queryClient = new QueryClient({
		queryCache,
		mutationCache,
		defaultOptions: {
			queries: {
				enabled: browser,
				refetchOnWindowFocus: true,
				refetchOnMount: 'always'
			}
		}
	});

	const persister = createAsyncStoragePersister({
		storage: browser ? window.localStorage : null
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
	<Toaster />
	{@render children()}
	<SvelteQueryDevtools />
</PersistQueryClientProvider>
