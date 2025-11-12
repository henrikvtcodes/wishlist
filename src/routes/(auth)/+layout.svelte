<script lang="ts">
	let { children } = $props();
	import {
		Card,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left';
</script>

<div class=" flex h-screen w-screen flex-col place-content-center items-center">
	<Card>
		<CardHeader
			><CardTitle>Login</CardTitle>
			<CardDescription>Log in to Henrik's Wishlist</CardDescription>
		</CardHeader>

		{@render children?.()}

		<CardFooter>
			<Button variant="link" size="sm" href="/" class="flex items-center"
				><ArrowLeftIcon /> Go home</Button
			>
		</CardFooter>
	</Card>
</div>
