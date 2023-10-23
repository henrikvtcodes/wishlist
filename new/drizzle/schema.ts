import {
  pgTableCreator,
  pgEnum,
  timestamp,
  text,
  integer,
  uniqueIndex,
  index,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { type AdapterAccount } from "next-auth/adapters";

export const itemCategory = pgEnum("ItemCategory", [
  "legos",
  "tools",
  "clothing",
  "tech",
]);
export const itemType = pgEnum("ItemType", ["high", "medium", "base"]);
export const itemVendor = pgEnum("ItemVendor", [
  "Other",
  "HarborFreight",
  "BHPhoto",
  "Lego",
  "HomeDepot",
  "Amazon",
]);

export const pgTable = pgTableCreator((name) => `${name}`);

export const verificationToken = pgTable(
  "VerificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
      identifierTokenKey: uniqueIndex(
        "VerificationToken_identifier_token_key",
      ).on(table.identifier, table.token),
    };
  },
);

export const users = pgTable(
  "User",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", { precision: 3, mode: "date" }),
    image: varchar("image", { length: 255 }),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
    };
  },
);

export const accounts = pgTable(
  "Account",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      providerProviderAccountIdKey: uniqueIndex(
        "Account_provider_providerAccountId_key",
      ).on(table.provider, table.providerAccountId),
    };
  },
);

export const session = pgTable(
  "Session",
  {
    id: text("id").primaryKey().notNull(),
    sessionToken: text("sessionToken").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expires: timestamp("expires", { precision: 3, mode: "date" }).notNull(),
  },
  (table) => {
    return {
      sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(
        table.sessionToken,
      ),
    };
  },
);

export const referrers = pgTable(
  "Referrers",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    ref: text("ref").notNull(),
  },
  (table) => {
    return {
      refKey: uniqueIndex("Referrers_ref_key").on(table.ref),
      refIdx: index("Referrers_ref_idx").on(table.ref),
    };
  },
);

export const item = pgTable("Item", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imgUrl: text("imgUrl").notNull(),
  itemUrl: text("itemUrl").notNull(),
  vendor: itemVendor("vendor").notNull(),
  priceCents: integer("priceCents").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" }).notNull(),
  category: itemCategory("category").notNull(),
  type: itemType("type").notNull(),
  isClaimable: boolean("isClaimable").default(true).notNull(),
  isClaimed: boolean("isClaimed").default(false).notNull(),
  claimedAt: timestamp("claimedAt", { precision: 3, mode: "string" }),
  claimerId: text("claimerId").references(() => referrers.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});
