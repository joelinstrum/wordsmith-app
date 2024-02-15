import { useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import * as themes from "themes";
import themeHelper from "utils/themeHelper";
import { getStoredItem, setStoredItem } from "utils/utilities";

const useTheme = <T extends ViewStyle>() => {
  const [themeFile, setThemeFile] = useState(themes.darkTheme);
  const [themeName, setThemeName] = useState<TTheme>("Dark");

  const getTheme = async () => {
    const storedTheme = await getStoredTheme();
    updateThemeFile(storedTheme as TTheme);
  };

  const updateThemeFile = (themeString: TTheme) => {
    switch (themeString) {
      case "Dark":
        setThemeFile(themes.darkTheme);
        break;
      case "Light":
        setThemeFile(themes.lightTheme);
        break;
    }
    setThemeName(themeString);
  };

  const [theme, setTheme] = useState<ThemeObject<T>>(themeHelper(themeFile));

  const storeTheme = async (themeToUse: string) => {
    return await setStoredItem("@WordSmith:theme", themeToUse);
  };

  const updateTheme = async (themeToUse: TTheme) => {
    await storeTheme(themeToUse);
    updateThemeFile(themeToUse);
  };

  const getStoredTheme = async () => {
    return (await getStoredItem("@WordSmith:theme")) || "Dark";
  };

  useEffect(() => {
    const newTheme = themeHelper(themeFile);
    setTheme(newTheme);
  }, [themeFile]);

  useEffect(() => {
    getTheme();
  });

  return {
    updateTheme,
    getTheme,
    theme,
    themeFile,
    themeName,
  };
};

export default useTheme;
