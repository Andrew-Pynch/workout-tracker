// Layout.tsx

import Footer from "./Footer";
import Navbar from "./Navbar";

import { useSession } from "next-auth/react";

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
          bg-primary
          flex
          h-full 
          min-h-screen
          w-full
          flex-col
          items-center
          justify-center
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
