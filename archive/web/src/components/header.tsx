import LoginButton from "./customButtons";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <nav className="fixed top-0 z-50 mt-4 flex w-full items-center justify-between">
      <div className="flex items-center space-x-3 pr-6 lg:pr-16">
        <p className="ont-extrabold text-sm tracking-tight text-white sm:text-[5rem]">
          Workout <span className="text-[hsl(280,100%,70%)]">Tracker</span>
        </p>
      </div>

      <LoginButton />
    </nav>
  );
};

export default Header;
