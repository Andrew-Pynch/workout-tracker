import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <nav className="flex justify-between ">
      <div className="flex items-center space-x-3 pr-6 lg:pr-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Workout <span className="text-[hsl(280,100%,70%)]">Tracker</span>
        </h1>
      </div>

      {/* <LoginButton /> */}
    </nav>
  );
};

export default Header;
