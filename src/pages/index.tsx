import { GetServerSideProps } from "next";
import Head  from "next/head";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/add",
      permanent: false,
    },
  };
};

export default function Home() {
  return (
    <>
      <Head>
        <title>workout-tracker</title>
        <meta name="description" content="Made with love by Andrew Pynch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
