import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { IntercomProvider } from "~/utils/IntercomProvider";
import Layout from "~/components/themed/Layout";
import 'react-toastify/dist/ReactToastify.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
        {/*
        <IntercomProvider>
          <Component {...pageProps} />
        </IntercomProvider>
        */}
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
