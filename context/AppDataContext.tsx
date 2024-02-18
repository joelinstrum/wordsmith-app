import useAppChecklist from "hooks/useAppChecklist";
import useGetDictionary from "hooks/useDictionary";
import useLoader from "hooks/useLoader";
import useWordList from "hooks/useWordList";
import React, { ReactNode, createContext, useContext } from "react";

interface AppData {
  dictionaryLoading: boolean;
  dictionary: IDictionary[];
  wordList: string[];
  getWordList: () => string[];
  getDictionary: VoidFunction;
  setSortColumn: (column: string) => void;
  hasVoiceSelected: boolean;
  hasInitialized: boolean;
  hasDictionary: boolean;
  updateField: (field: string, value: string | number, id: number) => void;
  updateWordList: (word: string, id: number) => void;
  generateRandomWordList: VoidFunction;
  addToList: (numberOfWordsToAdd?: number) => void;
  removeWordFromList: (word: IDictionary) => void;
  replaceWordInList: (word: IDictionary | string, limit: number) => void;
  deleteWordFromList: (word: IDictionary | string) => void;
  isInWordList: (word: string) => boolean;
  hasDictionaryError: boolean;
  updateHasLearned: (id: number, hasLearned: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
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
  const {
    dictionaryLoading,
    dictionary,
    triggerDictionaryQuery,
    sort,
    updateField,
    hasDictionaryError,
  } = useGetDictionary();

  const { hasVoiceSelected, hasInitialized, hasDictionary } = useAppChecklist();
  const {
    getWordList,
    updateWordList,
    generateRandomWordList,
    wordList,
    isInWordList,
    addToList,
    removeWordFromList,
    replaceWordInList,
    deleteWordFromList,
  } = useWordList(dictionary, updateField, triggerDictionaryQuery);

  const { loadingMessage, setLoadingMessage } = useLoader();

  const setSortColumn = (sortColumn: string) => {
    sort(sortColumn);
  };

  const updateHasLearned = (id: number, hasLearned: boolean) => {
    updateField("hasLearned", hasLearned.toString(), id);
  };

  const values: AppData = {
    dictionaryLoading,
    dictionary,
    getDictionary: triggerDictionaryQuery,
    setSortColumn,
    hasVoiceSelected,
    hasInitialized,
    hasDictionary,
    updateField,
    getWordList,
    wordList,
    updateWordList,
    generateRandomWordList,
    addToList,
    removeWordFromList,
    isInWordList,
    hasDictionaryError,
    updateHasLearned,
    replaceWordInList,
    deleteWordFromList,
    loadingMessage,
    setLoadingMessage,
  };

  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};
