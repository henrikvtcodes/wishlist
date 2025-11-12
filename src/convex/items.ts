import { v } from 'convex/values';
import { query } from './_generated/server';
import type { Item } from '$lib/components/item/types';
import { pick, merge } from 'es-toolkit/object';

export const allPublicInCategory = query({
	args: {
		categorySlug: v.string()
	},

	handler: async (ctx, args) => {
		const category = await ctx.db
			.query('categories')
			.withIndex('by_slug', (q) => q.eq('slug', args.categorySlug))
			.first();

		let items = await ctx.db
			.query('items')
			.withIndex('by_category', (q) => q.eq('categoryId', category?._id))
			.collect();

		// Filter for items that can be publicly displayed
		items = items.filter((i) => i.showPublic && !i.draftMode);
		// Order by priority
		items = items.sort((a, b) => b.priority - a.priority);
		// Pick/remap values that are sent to the client
		return items.map((i) =>
			merge(
				{ isClaimed: !!i.claimedBy, priceCents: Number(i.priceCents) },
				pick(i, ['name', 'claimable', 'description', 'imageUrl', 'itemUrl'])
			)
		) satisfies Item[];
	}
});

export const one = query({
	args: {
		slug: v.string()
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query('categories')
			.withIndex('by_slug', (q) => q.eq('slug', args.slug))
			.first();
	}
});
