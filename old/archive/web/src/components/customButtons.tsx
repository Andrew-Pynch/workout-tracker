import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

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

export const PrimaryButton = (props: ButtonProps) => {
  const cns = classNames(
    ` 
    flex
    h-10
    min-w-max
    items-center
    justify-center
    rounded
    rounded-full
    border
    border-primary

    py-2
    text-primary
    transition-colors
    delay-[30ms]
    ease-in
    px-6
    md:px-12
    ${
      props.disabled
        ? `
      bg-gray-400
      cursor-not-allowed
    `
        : `
      bg-secondary
      cursor-pointer
      hover:border-secondary
      hover:bg-primary
      hover:text-secondary
      hover:transition-colors
      hover:delay-[30ms]
    `
    }
      `,
    props.className
  );

  if (props.href && props.href !== "") {
    return (
      <Link className={cns} href={props.href}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "submit"}
      className={cns}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children ?? props.label}
    </button>
  );
};
