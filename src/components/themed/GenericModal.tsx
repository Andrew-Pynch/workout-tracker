import { useRef } from "react";
import { PrimaryButton, UnderLineButton } from "./buttons/CustomButtons";
import Divider from "./Divider";

type GenericModalProps = {
  setShowModal: (show: boolean) => void;
  title: string;
  description: string;
  ctaText: string;
  cancelText: string;
  children?: React.ReactNode;
};

const GenericModal = (props: GenericModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-tertiary fixed inset-0 z-[101] flex items-center justify-center px-4 sm:px-0">
      <div
        ref={modalRef}
        className="bg-backgroundInvert w-full max-w-md overflow-hidden"
      >
        <div className="select-none space-y-2 p-6">
          <h1 className="text-start text-2xl font-bold text-black">
            {props.title}
          </h1>
          <p className="text-start text-gray-600">
            <span className="font-semibold">{props.description}</span>
          </p>

          <div>{props.children}</div>
        
          <Divider />

          <div className="mt-4 flex flex-row">
            <PrimaryButton className="w-[33%]" href="/profile/edit">
              {props.ctaText}
            </PrimaryButton>
            <UnderLineButton
              className="ml-4"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              {props.cancelText}
            </UnderLineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
