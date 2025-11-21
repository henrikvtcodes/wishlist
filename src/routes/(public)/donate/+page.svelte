<script lang="ts">
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import type { PageProps } from './$types';
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';

	let { data }: PageProps = $props();

	import msfLogo from '../../../lib/assets/msflogo.svg';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex h-full w-screen items-center justify-center">
	<Card class=" max-w-1/3">
		<CardHeader><CardTitle>Make a donation to Doctors without Borders</CardTitle></CardHeader>
		<CardContent class="flex flex-col gap-y-4">
			<img
				src={'https://www.doctorswithoutborders.org/themes/custom/msf/logo.svg'}
				class="relative! rounded-md bg-white p-2"
				alt="Doctors without Borders logo"
			/>
			<CardDescription
				>With all of the bad things in the world, I feel strongly about MSFs mission and capacity to
				do good. Please let me know if you make a donation!</CardDescription
			>
			<Button href="https://give.doctorswithoutborders.org/campaign/745298/donate?"
				>Donate now!</Button
			>
		</CardContent>
	</Card>
</div>

<svelte:head>
	<title>donate | henrik's wishlist</title>
</svelte:head>
