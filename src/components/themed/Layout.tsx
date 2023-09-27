
import { useEffect, useState } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { data: session } = useSession();

  return (
    <>
      <main
        className={`
        flex min-h-screen flex-col items-center 
        `}
      >
        <Navbar />
        <div
          className={`
          flex
          h-full
          min-h-screen 
          w-full
          flex-col
          items-center
          justify-center
          bg-primary
          px-4
          pb-20 
          pt-28
          md:max-w-2xl
          lg:max-w-[1240px]
      `}
        >
          {props.children}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
