import Theme from "@/components/interfaces/themes";
import darkTheme from "@/constants/themes/darkTheme";
import lightTheme from "@/constants/themes/lightTheme";
import React, { createContext, useContext, useState } from "react";
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
  const [theme, setTheme] = useState<Theme>(
    useColorScheme() === "dark" ? darkTheme : lightTheme
  );

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
