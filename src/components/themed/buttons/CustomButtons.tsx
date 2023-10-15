
import classNames from "classnames";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useLogout } from "~/hooks/useLogout";
import { useUserStore } from "~/state/store";
import { api } from "~/utils/api";

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

    ${
      props.selected
        ? `
      bg-gray-400
      cursor-not-allowed
    `
        : `
      bg-secondary
      cursor-pointer
      hover:border-secondary
      hover:bg-primary
      hover:text-white
      hover:transition-colors
      hover:opacity-80
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

export const SecondaryButton = (props: ButtonProps) => {
  const cns = classNames(
    `
        flex
        h-10
        cursor-pointer
        items-center
        justify-center
        rounded
        ${props.disabled ? "bg-gray-400" : "bg-primary"}
        rounded-full
        border
        ${props.disabled ? "border-gray-100" : "border-secondary"}
        py-2
        ${props.disabled ? "text-gray-100" : "text-secondary"}
        transition-colors
        delay-[30ms]
        ease-in
        ${
          !props.disabled &&
          `
        hover:border-primary
        hover:bg-secondary
        hover:text-primary
        hover:delay-[30ms]
        `
        }
        px-6
        md:px-12
        ${props.disabled ? "bg-gray-400" : "bg-primary"}
        ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}
        
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
      disabled={props.disabled}
      className={cns}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children ?? props.label}
    </button>
  );
};

export const SelectableButton = (props: ButtonProps) => {
  if (props?.selected === undefined) return null;
  if (props.selected)
    return (
      <PrimaryButton {...props}>{props.label ?? props.children}</PrimaryButton>
    );
  else if (!props.selected)
    return (
      <SecondaryButton {...props}>
        {props.label ?? props.children}
      </SecondaryButton>
    );
};

export const GhostButton = (props: ButtonProps) => {
  return (
    <div
      className={`
       justiry-center
       flex
       items-center
  `}
    >
      <button
        disabled={props.disabled}
        className={`
            flex
            cursor-pointer
            items-center
            justify-center
            ${props.disabled ? "bg-gray-400" : "bg-primary"}
            p-2
            hover:text-gray-300
            ${props.className}
            ${props.disabled ? "bg-gray-400" : "bg-primary"}
            ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}
            ${props.className}
      `}
        onClick={props.onClick}
      >
        {props.children ?? props.label}
      </button>
    </div>
  );
};

export const TertiaryButton = (props: ButtonProps) => {
  const cns = classNames(
    `
    mt-4
    w-max
    max-w-max
    border-white
    px-6
    font-ibm-plex-mono
    uppercase
    text-white
    hover:bg-white
    hover:text-black
    md:px-6
      `,
    props.className
  );
  return (
    <SecondaryButton className={cns} onClick={() => {
      if (props.disabled) return;
      props.onClick?.();
    }} href={props.href}>
      {props.children ?? props.label}
    </SecondaryButton>
  );
};

export const UnderLineButton = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`
        relative
        w-fit text-center text-black before:absolute
        before:bottom-0 before:left-0 before:h-[1px]
        before:w-full before:origin-right
        before:scale-x-0 before:bg-black
        before:transition-transform
        before:duration-500 hover:before:origin-left
        hover:before:scale-x-100
        ${props.className}
      `}
    >
      {props.children ?? props.label}
    </button>
  );
};

export const LoginButton = (props: ButtonProps) => {
  const { data: session } = useSession();
  const { data: fullUser } = api.user.getUserById.useQuery(
    {
      userId: session?.user?.id ?? "",
    },
    {
      enabled: !!session?.user?.id,
    }
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
  else if (session === null)
    return (
      <PrimaryButton
        onClick={() => {
          signIn().catch(console.debug);
        }}
        className={props.className}
      >
        LOGIN
      </PrimaryButton>
    );
  else if (session?.user !== null)
    return (
      <SecondaryButton onClick={handleLogout} className={props.className}>
        LOG OUT
      </SecondaryButton>
    );
  else return <Spinner />;
};

