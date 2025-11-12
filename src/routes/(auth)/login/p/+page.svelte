<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { page } from '$app/state';
	import { useAuth } from '@mmailaender/convex-auth-svelte/sveltekit';

	let email = $state<string>(decodeURIComponent(page.url.searchParams.get('e') ?? ''));
	let password = $state<string>('');
	let submitting = $state<boolean>(false);

	const isLoading = $derived(useAuth().isLoading);
	const { signIn, signOut } = useAuth();

	function handleEmailSignIn(email: string, password: string) {
		submitting = true;
		signIn('password', { email, password, flow: 'signIn' });
		submitting = false;
	}
</script>

<Card.Content class="flex flex-col gap-y-4">
	<Label class="-mb-2" for="email">Email Address</Label>
	<Input
		id="email"
		name="email"
		autocomplete="email"
		disabled={submitting}
		bind:value={email}
		placeholder="hello@henrikvt.com"
	/>
	<Label class="-mb-2" for="password">Password</Label>
	<Input
		id="password"
		name="password"
		type="password"
		autocomplete="current-password"
		disabled={submitting}
		bind:value={password}
	/>
	<Button onclick={() => handleEmailSignIn(email, password)} disabled={submitting}
		>{#if submitting}
			Signing in
		{:else}
			Log in
		{/if}</Button
	>

	<Button
		disabled={submitting}
		href={`/login${email ? `?e=${encodeURIComponent(email)}` : ''}`}
		variant="link">Log in with a magic link</Button
	>
</Card.Content>
