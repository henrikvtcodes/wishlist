<script lang="ts">
	let { children } = $props();
	import { Card, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<div class=" flex h-screen w-screen flex-col place-content-center items-center">
	<Card>
		<CardHeader
			><CardTitle>Login</CardTitle>
			<CardDescription>Log in to Henrik's Wishlist</CardDescription>
		</CardHeader>

		{@render children?.()}
	</Card>
</div>
