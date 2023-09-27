import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/workout/add",
      permanent: false,
    },
  };
};

const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>workout-tracker</title>
        <meta name="description" content="Made with love by Andrew Pynch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Landing;
