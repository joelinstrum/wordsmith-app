import { ViewStyle } from "react-native";
import { newShade } from "utils/utilities";
import * as themes from "./";
type TTheme = "light" | "dark";

const getTheme = <T extends ViewStyle>(
  theme: TTheme = "dark"
): ThemeObject<T> => {
  let themeFile: ITheme;
  switch (theme) {
    case "dark":
      themeFile = themes.darkTheme;
      break;
    case "light":
      themeFile = themes.lightTheme;
      break;
  }
  return {
    container: {
      body: {
        marginLeft: 10,
        marginRight: 10,
      },
      card: {
        flex: 1,
      },
      screen: {
        flex: 1,
        backgroundColor: themeFile.colors.primaryBackground,
        padding: 10,
        paddingTop: 50,
        display: "absolute",
        top: 0,
        left: 0,
      },
      screenText: {
        fontSize: 16,
        color: themeFile.colors.primaryText,
      },
      centeredRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      overlay: {
        display: "relative",
        height: 100,
        width: 200,
        top: 5,
        left: 5,
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, .9)",
      },
      modal: {
        display: "relative",
        width: "80%",
        left: "10%",
        top: "50%",
        zIndex: 200,
        height: 350,
        backgroundColor: "rgba(155, 155, 0, 1.0)",
        border: "#000",
        borderRadius: 10,
      },
    },
    button: {
      primary: {
        marginTop: 80,
        backgroundColor: themeFile.colors.primaryButtonBackground,
        paddingHorizontal: 140,
        paddingVertical: 10,
        borderRadius: 30,
      },
      menuText: {
        color: themeFile.colors.primaryText,
        fontSize: 20,
      },
      icon: {
        maxHeight: 32,
        maxWidth: 32,
        width: 32,
        height: 32,
        marginRight: 10,
      },
      nav: {
        maxHeight: 24,
        maxWidth: 24,
        width: 24,
        height: 24,
        marginRight: 10,
      },
      action: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: themeFile.colors.primaryButtonBackground,
        borderRadius: 8,
        paddingVertical: 10,
      },
      defaultButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        borderWidth: 2,
        borderRadius: 8,
      },
      menu: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        minWidth: 300,
        minHeight: 50,
      },
      skip: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        width: 200,
        backgroundColor: "#2196F3",
      },
      play1: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        backgroundColor: "#444",
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        minWidth: 300,
        minHeight: 50,
      },
      play2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        backgroundColor: "green",
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        minWidth: 300,
        minHeight: 50,
      },
      neutral: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        backgroundColor: "#c99e02",
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        minWidth: 300,
        minHeight: 50,
      },
    },
    text: {
      primaryLink: {
        color: themeFile.colors.primaryLink,
      },
    },
    dataTable: {
      header: {
        backgroundColor: newShade(themeFile.colors.primaryBackground, 20),
        borderBottomWidth: 0,
      },
      headerText: {
        color: themeFile.colors.secondaryText,
        fontSize: 16,
      },
      row: {
        borderBottomColor: newShade(themeFile.colors.primaryBackground, 100),
        backgroundColor: newShade(themeFile.colors.primaryBackground, 10),
      },
      rowText: {
        color: themeFile.colors.secondaryText,
        fontSize: 16,
      },
      rowTextLink: {
        color: themeFile.colors.primaryLink,
        fontSize: 16,
      },
    },
  };
};

export default getTheme;
