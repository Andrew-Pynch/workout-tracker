import { type NextPage } from "next";
import Menu from "~/components/menu";
import { EMenuOption } from "~/domain/eMenuOption";

const Home: NextPage = () => {
  return (
    <>
      <Menu option={EMenuOption.ADD} />
    </>
  );
};

export default Home;
