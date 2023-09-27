
import { User } from "@prisma/client";

export type UserState = {
  user: User | null;

  setUser: (_user: User) => void;

  clear: () => void;
};

export const userStore = (
  set: (state: UserState) => void,
  get: () => UserState
): UserState => ({
  user: null,
  setUser: (_user: User) => {
    const currentState = get();

    if (JSON.stringify(currentState.user) !== JSON.stringify(_user)) {
      set({ ...currentState, user: _user });
    }
  },
  clear: () => {
    set({
      user: null,
      setUser: (_user: User) => {},
      clear: () => {},
    });
  },
});
