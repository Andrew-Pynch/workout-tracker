import { useSession } from "next-auth/react";
import LoginButton from "./customButtons";

type SignInRequestProps = {};

const SignInRequest = (props: SignInRequestProps) => {
  const { data: sessionData } = useSession();

  if (sessionData) {
    return null;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center ">
      <h2 className="mb-8 text-4xl font-semibold text-white">
        Please sign in to continue
      </h2>
      <LoginButton />
    </div>
  );
};

export default SignInRequest;
