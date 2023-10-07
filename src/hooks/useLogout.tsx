
import { signOut } from "next-auth/react";
import { clearStores } from "../state/store";

export const useLogout = () => {
  const handleLogout = async () => {
    try {
      await signOut();
      clearStores();
    } catch (error) {
      console.error(error);
    }
  };

  return handleLogout;
};
