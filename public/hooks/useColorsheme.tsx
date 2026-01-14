import Theme from "@/components/interfaces/themes";
import darkTheme from "@/constants/themes/darkTheme";
import lightTheme from "@/constants/themes/lightTheme";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const themeContext = createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
} | null>(null);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(lightTheme);
  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

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
