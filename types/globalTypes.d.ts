declare type VoidFunction = () => void;

declare interface ITheme {
  colors: {
    primaryBackground: string;
    primaryText: string;
    primaryBorder: string;
    primaryButtonBackground: string;
    primaryButtonText: string;
    tertiaryButtonBackground: string;
    headingBackgroundColor: string;
    headingTextColor: string;
    logoBackground: string;
    logoColor: string;
    secondaryBackground: string;
    secondaryText: string;
    secondaryButtonBackground: string;
    secondaryButtonText: string;
    secondaryBorder: string;
    tertiaryBackground: string;
    tertiaryText: string;
    tertiaryBorder: string;
    notification: string;
    warnButton: string;
    warnText: string;
    primaryLink: string;
    secondaryLink: string;
    dataHeaderBackground: string;
    dataRowBackground: string;
    modalBackground: string;
    modalText: string;
    tableHeaderBackground: string;
    tableHeaderFontColor: string;
    checkboxColor: string;
    inputOutline: string;
    inputBackground: string;
    inputText: string;
    inputPlaceholder: string;
  };
}

declare interface ThemeObject<T extends ViewStyle> {
  [key: string]: ThemeContainer<T>;
}

interface IStyles<T extends ViewStyle> {
  [key: string]: Container<T>;
}

declare interface IScreenContainer {
  children?: ReactNode;
}

declare type SQLiteDatabase = SQLite.SQLiteDatabase;

declare interface IDictionary {
  id: number;
  word: string;
  category: string;
  meaning: string;
  usage: string;
  etymology: string;
  isSelected: string;
  hasLearned: string;
  isKnown: string;
  pronunciation: string;
  [key: string]: string | number;
  tts: string;
}

type TTheme = "Dark" | "Light";
T;
