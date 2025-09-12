<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { page } from '$app/state';

	let email = $state<string>();
</script>

<Card.Content class="flex flex-col gap-y-4">
	<Label class="-mb-2" for="email">Email Address</Label>
	<Input
		id="email"
		name="email"
		autocomplete="email"
		defaultValue={decodeURIComponent(page.url.searchParams.get('e') ?? '')}
		bind:value={email}
		placeholder="hello@henrikvt.com"
	/>
	<Button>Get Magic Login Link</Button>

	<Button href="/login/p{email ? `?e=${encodeURIComponent(email)}` : ''}" variant="link"
		>Log in with a password</Button
	>
</Card.Content>
