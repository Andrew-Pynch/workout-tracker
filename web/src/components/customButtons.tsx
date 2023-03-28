import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};

export default LoginButton;

import React from "react";
type ButtonProps = {
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  className?: React.ComponentProps<"div">["className"];
};
export const PrimaryButton = (props: ButtonProps) => {
  return (
    <button
      className={`
           rounded-full 
           px-10 
           py-3 
           font-semibold 
           text-white 
           no-underline 
           transition 
           hover:bg-white/20
           ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.children ?? props.label}
    </button>
  );
};
