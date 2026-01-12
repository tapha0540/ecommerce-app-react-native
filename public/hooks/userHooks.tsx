import React, { createContext, useContext, useState } from "react";
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
  const userTest = {
    firstName: "Moustapha",
    id: 1,
    email: "fmoustapha095@gmail.com",
    lastName: "Fall",
  };

  const [user, setUser] = useState<User | null>(null);

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
