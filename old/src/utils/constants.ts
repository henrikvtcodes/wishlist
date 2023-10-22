import type { ItemCategory, ItemVendor } from "server/db/generated";

export const categoryToTitleMap: CategoryToTitleMap = {
  tech: "Techology & Electronics",
  tools: "Tools",
  legos: "Legos",
  clothing: "Clothing",
};

type CategoryKeys = keyof typeof ItemCategory;

type CategoryToTitleMap = { [K in CategoryKeys]: string };

export const vendorToTitleMap: VendorToTitleMap = {
  Amazon: "Amazon",
  HomeDepot: "Home Depot",
  Lego: "Lego",
  HarborFreight: "Harbor Freight",
  BHPhoto: "B&H Photo Video",
  Other: "Other",
};

type VendorKeys = keyof typeof ItemVendor;

type VendorToTitleMap = { [K in VendorKeys]: string };

