export type Item = {
	name: string;
	description: string;
	priceCents: number;
	isClaimed: boolean;
	claimable: boolean;
	itemUrl?: string | null;
	imageUrl?: string | null;
	vendorName: string;
};
