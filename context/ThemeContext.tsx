import React, { ReactNode, createContext, useContext } from "react";
import { ViewStyle } from "react-native";
import getTheme from "themes/theme";

interface ThemeContextProps {
  theme: ThemeObject<ViewStyle>;
}

interface ThemeProviderProps {
  children?: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = getTheme();

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme;
};
