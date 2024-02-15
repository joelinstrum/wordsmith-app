import useTheme from "hooks/useTheme";
import React, { ReactNode, createContext, useContext } from "react";
import { ViewStyle } from "react-native";

interface ThemeContextProps {
  theme: ThemeObject<ViewStyle>;
  updateTheme: (themeToUse: TTheme) => void;
  themeName: TTheme;
}

interface ThemeProviderProps {
  children?: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, updateTheme, themeName } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return {
    theme: context.theme,
    updateTheme: context.updateTheme,
    themeName: context.themeName,
  };
};
