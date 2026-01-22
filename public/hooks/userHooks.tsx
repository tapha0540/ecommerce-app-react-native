import User from "@/components/interfaces/api/user";
import getCurrentUser from "@/services/api/auth/get_current_user";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext<{
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    fn();
  }, []);

  return (
    <userContext.Provider value={{ user, loading, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
