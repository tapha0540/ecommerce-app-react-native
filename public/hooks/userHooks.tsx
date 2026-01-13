import getCurrentUser from "@/services/auth/get_current_user";
import React, { createContext, useContext, useEffect, useState } from "react";
import User from "../components/interfaces/user";

const userContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fn = async () => setUser(await getCurrentUser());

    fn();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const userHook = useContext(userContext);
  return userHook;
};
