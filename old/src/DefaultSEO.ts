import type { DefaultSeoProps } from "next-seo";
import { getBaseUrl } from "server/common/getBaseUrl";

const DefaultSEOConfig: DefaultSeoProps = {
  defaultTitle: "Home",
  titleTemplate: "%s | Henrik's Wishlist",
  description: "Henrik's Birthday and Christmas Wishlist",

  openGraph: {
    type: "website",
    url: getBaseUrl(),
    siteName: "Henrik's Wishlist",
    images: [{ url: "/undergroundhenrik.jpg" }],
  },
};

export default DefaultSEOConfig;
