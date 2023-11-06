import { type ItemCategory, type ItemVendor } from "./server/db/schema";

export const categoryToTitleMap = new Map<ItemCategory, string>([
  ["tech", "Techology & Electronics"],
  ["tools", "Tools"],
  ["legos", "Legos"],
  ["clothing", "Clothing"],
  ["misc", "Other"],
]);

// type CategoryToTitleMap = { [K in ItemCategory]: string };

export const vendorToTitleMap = new Map<ItemVendor, string>([
  ["Amazon", "Amazon"],
  ["HomeDepot", "Home Depot"],
  ["Lego", "Lego"],
  ["HarborFreight", "Harbor Freight"],
  ["BHPhoto", "B&H Photo Video"],
  ["Sweetwater", "Sweetwater"],
  ["Other", "Other"],
]);

// type VendorToTitleMap = { [K in ItemVendor]: string };

export const PROD_BASE_URL = new URL("https://wishlist.henrikvt.com");
