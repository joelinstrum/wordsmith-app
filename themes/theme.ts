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
      row: {
        flexDirection: "row",
      },
      wordDrillRow: {
        flexDirection: "row",
        marginTop: 20,
      },
      col: {
        flexDirection: "column",
      },
      card: {
        flex: 1,
      },
      contentContainer: {
        display: "flex",
        flexBais: "content",
      },
      wordDrill: {
        paddingTop: 10,
        display: "flex",
      },
      wordDrillLabel: {
        color: "#aaa",
        fontSize: 16,
        marginRight: 10,
        width: 100,
      },
      wordDrillValue: {
        color: "#fff",
        fontSize: 16,
        width: 250,
      },
      warn: {
        minHeight: 200,
        margin: 20,
        borderColor: "gold",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#151515",
        justifyContent: "center",
        alignItems: "center",
      },
      screen: {
        flex: 1,
        backgroundColor: themeFile.colors.primaryBackground,
        padding: 10,
        paddingTop: 50,
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
      loader: {
        backgroundColor: themeFile.colors.primaryBackground,
        padding: 10,
        display: "flex",
        alignItems: "center",
      },
      loaderText: {
        color: "#aaa",
        fontSize: 20,
        fontStyle: "italic",
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
      settings: {
        backgroundColor: "#444",
        color: "#efefef",
        borderRadius: 10,
        padding: 5,
        marginRight: 10,
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
        backgroundColor: "#222",
      },
      defaultButtonPressed: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        borderColor: "rgba(255, 255, 255, .35)",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#444",
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
