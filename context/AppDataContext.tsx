import useGetDictionary from "hooks/useGetDictionary";
import React, { ReactNode, createContext, useContext } from "react";

interface AppData {
  dictionaryLoading: boolean;
  dictionary: IDictionary[];
  getDictionary: () => void;
  setSortColumn: (column: string) => void;
}

interface AppDataContextProps {
  children: ReactNode;
}

const AppDataContext = createContext<AppData | undefined>(undefined);

export const useAppData = (): AppData => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};

export const AppDataProvider: React.FC<AppDataContextProps> = ({
  children,
}) => {
  const { dictionaryLoading, dictionary, triggerDictionaryQuery, sort } =
    useGetDictionary();

  const getDictionary = () => {
    triggerDictionaryQuery();
  };

  const setSortColumn = (sortColumn: string) => {
    sort(sortColumn);
  };

  const values: AppData = {
    dictionaryLoading,
    dictionary,
    getDictionary,
    setSortColumn,
  };

  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};
