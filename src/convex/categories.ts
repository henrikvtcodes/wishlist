import { v } from 'convex/values';
import { query } from './_generated/server';

export const all = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('categories').withIndex('by_priority').order('asc').collect();
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
