
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  HTMLAttributeAnchorTarget,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Close from "~/icons/Close";
import Hamburger from "~/icons/Hamburger";
import { Logo } from "./Logo";
import { LoginButton } from "./buttons/LoginButton";

export const CustomNavLink = ({
  children,
  ...props
}: {
  children: ReactNode;
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  onClick?: () => void;
}) => {
  return (
    <Link className="relative" {...props}>
      <span
        className={`
            w-fit text-center before:absolute before:bottom-0
            before:left-0 before:h-[1px] before:w-full
            before:origin-right before:scale-x-0
            before:bg-white before:transition-transform
            before:duration-500
            hover:before:origin-left hover:before:scale-x-100
          `}
      >
        {children}
      </span>
    </Link>
  );
};

export const InlineTextLink = ({
  children,
  ...props
}: {
  children: ReactNode;
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  onClick?: () => void;
}) => {
  return (
    <Link className="relative" {...props} target="_blank">
      <span
        className={`
            bold w-fit text-center underline
            before:absolute before:bottom-0 before:left-0
            before:h-[1px] before:w-full
            before:origin-right before:scale-x-0
            before:bg-black before:transition-transform before:duration-500
            hover:before:origin-left hover:before:scale-x-100
          `}
      >
        {children}
      </span>
    </Link>
  );
};

const NavLinks = [
  { title: "Events", href: "/events", target: "_self" },
  { title: "About River", href: "https://getriver.io", target: "_blank" },
  { title: "Profile", href: "/profile", target: "_self" },
  { title: "Admin", href: "/admin", target: "_self", showForAdmin: true },
];

const Navbar = () => {
  const { data: sessionData } = useSession();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navbarRef = useRef<HTMLElement | null>(null);

  const handleResize = () => {
    const navbarHeight = navbarRef.current?.offsetHeight || 0;
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbarHeight}px`
    );
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`
          fixed z-[100] flex h-max w-full justify-center bg-primary 
          bg-opacity-60 px-4 py-6 font-ibm-plex-mono backdrop-blur-md
          lg:max-w-[1240px] lg:items-end lg:pb-3
        `}
      >
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[99] h-screen bg-black opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <div className="flex w-full items-center justify-between">
          <div className="flex">
            <Logo asLink />
          </div>

          {/* Hamburger Menu Icon */}
          <Hamburger
            onClick={handleMobileMenuToggle}
            className="cursor-pointer select-none text-4xl text-secondary lg:hidden"
          />

          {/* Desktop Menu */}
          <div
            className={`
              hidden min-w-fit items-center justify-center gap-6 text-[16px] 
              uppercase text-white lg:flex xl:gap-12
          `}
          >
            {/*NavLinks.map((link) =>
              link.showForAdmin === undefined ||
              (isAdmin && link.showForAdmin) ? (
                <CustomNavLink
                  key={link.href}
                  href={link.href}
                  target={link.target}
                >
                  {link.title}
                </CustomNavLink>
              ) : null
            )*/}

            <div className="mt-auto flex gap-4">
              {/*(isManager || isAdmin) && (
                <PrimaryButton
                  href="/events/create"
                  className="px-5"
                  onClick={closeMobileMenu}
                >
                  Create Event
                </PrimaryButton>
              )*/}
              <LoginButton />
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`
                  absolute
                  right-0 top-0 z-[201] flex h-screen w-64 
                  flex-col gap-4 bg-primary px-4
                  py-6
                  font-ibm-plex-mono backdrop-blur-md lg:hidden
              `}
              >
                <Close
                  onClick={() => closeMobileMenu()}
                  className="font-2xl select-none self-end"
                />
                <div className="flex h-full flex-col justify-between py-12">
                  <div
                    className={`
                  flex h-full flex-col items-center justify-start gap-8 uppercase
                  `}
                  >
                    {/*NavLinks.map((link) =>
                      link.showForAdmin === undefined ||
                      (isAdmin && link.showForAdmin) ? (
                        <CustomNavLink
                          key={link.href}
                          href={link.href}
                          target={link.target}
                          onClick={closeMobileMenu}
                        >
                          {link.title}
                        </CustomNavLink>
                      ) : null
                    )*/}
                  </div>
                  <div className="flex flex-col gap-4 uppercase">
                    {/*(isManager || isAdmin) && (
                      <PrimaryButton
                        href="/events/create"
                        className="px-5"
                        onClick={closeMobileMenu}
                      >
                        Create Event
                      </PrimaryButton>
                    )*/}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
