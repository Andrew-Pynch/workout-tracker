import Image from "next/image";
import router from "next/router";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Divider = (props: {
  className?: React.ComponentProps<"div">["className"];
}) => {
  return (
    <p
      className={`
     ml-2
     mr-2
     ${props.className}
   `}
    >
      {" "}
      |{" "}
    </p>
  );
};

const Footer = () => {
  const socialsIconSize = 23;
  return (
    <div
      className={`
        flex
        w-full
        border-t-[0.5px]
        border-secondary
        bg-transparent
        pb-5
      `}
    >
      <div
        className={`
            flex
            h-full
            w-full
            flex-col
            items-center
            justify-between
            
        `}
      >
        <div
          className={`
          text-wrap
          mt-8
          flex
          w-full
          flex-col
          items-center
          justify-center
          text-center
          md:mt-[70px]
          md:w-1/4
        `}
        >
          <div
            onClick={() => {
              router.push("/");
            }}
            className={`
                cursor-pointer
              `}
          >
            <Image src={"/logo.svg"} alt="logo-footer" height={80} width={80} />
          </div>

          <div
            className={`
            m-8
            flex
            flex-row
            items-center
            space-x-4
            opacity-70
          `}
          >
            <a
              target="_blank"
              rel="noopoener noreferrer"
              href="https://github.com/Andrew-Pynch"
            >
              <FaGithub
                size={socialsIconSize}
                className={`
                hover:text-secondary
              `}
              />
            </a>
            <a
              target="_blank"
              rel="noopoener noreferrer"
              href="https://twitter.com/andrew_pynch"
            >
              <FaTwitter
                size={socialsIconSize}
                className={`
                hover:text-secondary
              `}
              />
            </a>
            <a
              target="_blank"
              rel="noopoener noreferrer"
              href={"https://www.linkedin.com/in/andrew-pynch-39b696169/"}
            >
              <FaLinkedin
                size={socialsIconSize}
                className={`
                hover:text-secondary
              `}
              />
            </a>
            <a
              target="_blank"
              rel="noopoener noreferrer"
              href={"https://www.youtube.com/@andrewpynch7732"}
            >
              <FaYoutube
                size={socialsIconSize}
                className={`
                hover:text-secondary
              `}
              />
            </a>
          </div>
        </div>
        <div
          className={`
          font-ibm-plex-mono text-dark-gray mb-6 mt-2 flex h-max
          flex-col items-center justify-center
          space-y-2 text-[14px] sm:flex-row
          sm:items-center sm:space-x-2 sm:space-y-0
          `}
        >
          <a target="_blank" href={"https://www.pynchlabs.com/"}>
            ©2023 Pynch Labs, LLC
          </a>
          {/*
          <Divider className="hidden sm:block" />
          
            <a
              target="_blank"
              href={"https://www.getriver.io/terms-and-conditions"}
            >
              Terms
            </a>
            <span style={{ margin: "5 5px" }}>&</span>
            <a target="_blank" href={"https://www.getriver.io/privacy"}>
              Privacy
            </a>
            <Divider className="hidden sm:block" />
            <a target="_blank" href={"https://www.getriver.io/about"}>
              About
            </a>
            <Divider className="hidden sm:block" />
            <a target="_blank" href={"https://www.getriver.io/contact"}>
              Contact us
            </a>
          */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
