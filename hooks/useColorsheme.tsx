import Theme from "@/components/interfaces/themes";
import lightTheme from "@/components/themes/lightTheme";
import React, { createContext, useContext, useState } from "react";

const themeContext = createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
} | null>(null);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(themeContext);
  return theme;
};
