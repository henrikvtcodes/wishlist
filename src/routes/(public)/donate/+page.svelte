<script lang="ts">
	import CardContent from '@/components/ui/card/card-content.svelte';
	import type { PageProps } from './$types';
	import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

	let { data }: PageProps = $props();

	import msfLogo from '../../../lib/assets/msflogo.svg';
</script>

<div class="flex h-full w-screen items-center justify-center">
	<Card class="h-min w-min">
		<CardHeader
			><CardTitle>Make a donation to Doctors without Borders</CardTitle>
			<CardDescription>With all of the</CardDescription>
		</CardHeader>
		<CardContent>
			<img src={msfLogo} alt="Doctors without Borders logo" />
		</CardContent>
	</Card>
</div>
