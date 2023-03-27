import { useRouter } from "next/router";
import { EMenuOption } from "~/domain/eMenuOption";
import { Col, Row } from "./grid";

type MenuProps = {
  option: EMenuOption;
};

const Menu = (props: MenuProps) => {
  const router = useRouter();

  const sharedStyles = `
    cursor-pointer
    select-none
  `;

  const selected = "text-purple-500";
  const notSelected = "text-white";

  return (
    <div
      className={`
        fixed top-20 left-14 w-full
      `}
    >
      <Row>
        <Col>
          <h2
            className={`
             ${props.option === EMenuOption.ADD ? selected : notSelected}
             ${sharedStyles}
        `}
            onClick={() => {
              router.push(EMenuOption.ADD);
            }}
          >
            Add
          </h2>
        </Col>
        <Col>
          <h2
            className={`
             ${props.option === EMenuOption.VIEW ? selected : notSelected}
             ${sharedStyles}
        `}
            onClick={() => {
              router.push(`/${EMenuOption.VIEW}`);
            }}
          >
            View
          </h2>
        </Col>
      </Row>
    </div>
  );
};

export default Menu;
