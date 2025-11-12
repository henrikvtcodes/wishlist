// src/convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
	...authTables,
	users: defineTable({
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.float64()),
		image: v.optional(v.string()),
		isAnonymous: v.optional(v.boolean()),
		name: v.optional(v.string()),
		phone: v.optional(v.string()),
		phoneVerificationTime: v.optional(v.float64()),
		role: v.optional(v.union(v.literal('admin'), v.literal('user')))
	})
		.index('email', ['email'])
		.index('phone', ['phone']),
	items: defineTable({
		name: v.string(),
		description: v.string(),
		priceCents: v.int64(),
		claimable: v.boolean(),
		claimedBy: v.optional(v.id('users')),
		showPublic: v.boolean(),
		draftMode: v.boolean(),
		showOnlyTo: v.array(v.id('users')),
		vendorName: v.string(),
		itemUrl: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
		categoryId: v.optional(v.id('categories')),
		priority: v.number()
	})
		.index('filter', ['categoryId', 'showPublic', 'draftMode'])
		.index('by_category', ['categoryId'])
		.index('by_showable', ['showPublic', 'draftMode'])
		.index('by_priority', ['priority'])
		.index('privateItem', ['showOnlyTo']),
	categories: defineTable({
		name: v.string(),
		slug: v.string(),
		priority: v.number()
	})
		.index('by_priority', ['priority'])
		.index('by_slug', ['slug'])
});

export default schema;
