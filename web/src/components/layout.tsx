import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { api } from "../utils/api";
import Header from "./header";
import SignInRequest from "./signInRequest";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { data: session, status } = useSession();
  const utils = api.useContext();
  const { pathname } = useRouter();

  const [componentToShow, setComponentToShow] =
    React.useState<React.ReactNode>(null);
  useEffect(() => {
    console.log("getting component to render", status, pathname);
    setComponentToShow(getComponentToShow(status, pathname));

    return () => {};
  }, [componentToShow, session, pathname]);

  const getComponentToShow = (
    _status: "authenticated" | "loading" | "unauthenticated",
    _pathname: string
  ) => {
    const isAuthenticated = _status === "authenticated";
    const isHome = _pathname === "/home";

    // setting this up as multiple if blocks in case we wanna have more logic
    // around authentication && showing certain screens
    if (isAuthenticated) {
      return props.children;
    }

    if (!isAuthenticated) {
      if (isHome) {
        return props.children;
      }
      return <SignInRequest />;
    }
  };

  return (
    <div
      className={`
         bg-transparent
    `}
    >
      <Head>
        <title>Workout Tracker</title>
        <meta
          name="description"
          content="Generated with love by Andrew Pynch"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <main className="flex flex-grow flex-col items-center justify-center overflow-y-auto">
          <Header />
          {componentToShow}
        </main>
      </div>
    </div>
  );
};

export default Layout;
