<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { page } from '$app/state';
	import { useAuth } from '@mmailaender/convex-auth-svelte/sveltekit';

	let email = $state<string>(decodeURIComponent(page.url.searchParams.get('e') ?? ''));
	let submitting = $state<boolean>(false);
	let submitted = $state<boolean>(false);

	const isLoading = $derived(useAuth().isLoading);
	const { signIn, signOut } = useAuth();

	function handleMagicLinkSignIn(email: string) {
		submitting = true;
		signIn('resend', { email, flow: 'signIn' });
		submitting = false;
		submitted = true;
	}
</script>

{#if submitted}
	<Card.Content class="justify-content flex flex-col items-center"
		>Link sent! Check your email</Card.Content
	>
{:else}
	<Card.Content class="flex flex-col gap-y-4">
		<Label class="-mb-2" for="email">Email Address</Label>
		<Input
			id="email"
			name="email"
			autocomplete="email"
			bind:value={email}
			disabled={submitting}
			placeholder="hello@henrikvt.com"
		/>
		<Button onclick={() => handleMagicLinkSignIn(email)}
			>{#if submitting}
				Sending link...
			{:else}
				Log in with magic link
			{/if}</Button
		>

		<!-- <Button href="/login/p{email ? `?e=${encodeURIComponent(email)}` : ''}" variant="link"
		>Log in with a password</Button
	> -->
	</Card.Content>
{/if}
