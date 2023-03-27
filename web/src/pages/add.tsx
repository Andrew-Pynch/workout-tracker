import React from "react";
import Menu from "~/components/menu";
import { EMenuOption } from "~/domain/eMenuOption";

type AddProps = {};

const Add = (props: AddProps) => {
  return (
    <div>
      <Menu option={EMenuOption.ADD} />
      Add
    </div>
  );
};

export default Add;
