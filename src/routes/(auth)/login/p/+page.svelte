<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { page } from '$app/state';

	let email = $state<string>();
	let password = $state<string>();
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
	<Label class="-mb-2" for="password">Password</Label>
	<Input
		id="password"
		name="password"
		type="password"
		autocomplete="current-password"
		bind:value={password}
	/>
	<Button>Log in</Button>

	<Button href={`/login${email ? `?e=${encodeURIComponent(email)}` : ''}`} variant="link"
		>Log in with a magic link</Button
	>
</Card.Content>
