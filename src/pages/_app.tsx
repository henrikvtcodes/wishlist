import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { trpc } from "../utils/trpc";
import { UserWatcher } from "components/UserWatcher";

import "../styles/globals.css";
import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import SEO from "DefaultSEO";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <SessionProvider session={session}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UserWatcher />
        <PlausibleProvider
          domain="wishlist.henriktech.com"
          trackOutboundLinks
          exclude="/admin**"
        >
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </PlausibleProvider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
