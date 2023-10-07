import { signIn, useSession } from "next-auth/react";
import { useLogout } from "~/hooks/useLogout";
import { api } from "~/utils/api";
import { useUserStore } from "~/state/store";
import { useEffect } from "react";
import Spinner from "../Spinner";

type ButtonProps = {
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  className?: React.ComponentProps<"div">["className"];
  disabled?: boolean;
  type?: React.ComponentProps<"button">["type"];
  href?: string;
  selected?: boolean;
};

export const LoginButton = (props: ButtonProps) => {
  const { data: session } = useSession();
  const { data: fullUser } = api.user.getUserById.useQuery(
    {
      userId: session?.user?.id ?? "",
    },
    {
      enabled: !!session?.user?.id,
    },
  );
  const handleLogout = useLogout();

  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const setUserStoreUser = async () => {
      if (session?.user?.id && user === null) {
        if (!fullUser) return;
        else setUser(fullUser);
      }
    };
    setUserStoreUser();
  }, [session?.user, setUser, fullUser]);

  if (session === undefined) return <Spinner />;
  else if (session === null) {
    return (
      <button
        onClick={() => {
          signIn().catch(console.debug);
        }}
        className={props.className}
      >
        LOGIN
      </button>
    );
  } else if (session?.user !== null) {
    return (
      <button onClick={handleLogout} className={props.className}>
        LOG OUT
      </button>
    );
  } else return <Spinner />;
};
