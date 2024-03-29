import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

import { cuid } from "~/cuid";

export const itemCategory = pgEnum("ItemCategory", [
  "legos",
  "tools",
  "clothing",
  "misc",
  "tech",
]);

export type ItemCategory = (typeof itemCategory)["enumValues"][number];

export const itemType = pgEnum("ItemType", ["high", "medium", "base"]);

export type ItemType = (typeof itemType)["enumValues"][number];

export const itemVendor = pgEnum("ItemVendor", [
  "Other",
  "HarborFreight",
  "BHPhoto",
  "Lego",
  "HomeDepot",
  "Amazon",
  "Sweetwater",
]);

export type ItemVendor = (typeof itemVendor)["enumValues"][number];

export const pgTable = pgTableCreator((name) => `wishlist_${name}`);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey().$defaultFn(cuid),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .$defaultFn(cuid),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey().$defaultFn(cuid),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull().$defaultFn(cuid),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const referrers = pgTable(
  "Referrers",
  {
    id: text("id").primaryKey().notNull().$defaultFn(cuid),
    name: text("name").notNull(),
    ref: text("ref").notNull().unique(),
  },
  (table) => {
    return {
      refKey: uniqueIndex("Referrers_ref_key").on(table.ref),
      refIdx: index("Referrers_ref_idx").on(table.ref),
    };
  },
);

export const item = pgTable("Item", {
  id: text("id").primaryKey().notNull().$defaultFn(cuid),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imgUrl: text("imgUrl").notNull(),
  itemUrl: text("itemUrl").notNull(),
  vendor: itemVendor("vendor").notNull(),
  priceCents: integer("priceCents").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull(),
  category: itemCategory("category").notNull(),
  type: itemType("type").notNull(),
  isClaimable: boolean("isClaimable").default(true).notNull(),
  isClaimed: boolean("isClaimed").default(false).notNull(),
  claimedAt: timestamp("claimedAt", { precision: 3, mode: "date" }),
  claimerId: text("claimerId").references(() => referrers.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  show: boolean("show").default(true).notNull(),
});
