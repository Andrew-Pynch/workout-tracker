type ViewProps = {};
import Menu from "~/components/menu";
import { EMenuOption } from "~/domain/eMenuOption";

const View = (props: ViewProps) => {
  return (
    <div>
      <Menu option={EMenuOption.VIEW} />
      View
    </div>
  );
};

export default View;
