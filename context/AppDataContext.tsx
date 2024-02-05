import useAppChecklist from "hooks/useAppChecklist";
import useGetDictionary from "hooks/useGetDictionary";
import useQuery from "hooks/useQuery";
import React, { ReactNode, createContext, useContext, useState } from "react";

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
  addToList: VoidFunction;
  removeWordFromList: (word: IDictionary) => void;
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
  } = useGetDictionary();

  const { hasVoiceSelected, hasInitialized, hasDictionary } = useAppChecklist();
  const [wordList, setWordList] = useState<string[]>([]);
  const query = useQuery();

  const getDictionary = () => {
    triggerDictionaryQuery();
  };

  const setSortColumn = (sortColumn: string) => {
    sort(sortColumn);
  };

  const getWordList = () => {
    if (dictionary && dictionary.length) {
      const _wordList = dictionary
        .filter((item: IDictionary) => item.isSelected === "TRUE")
        .map((item) => item.word);
      setWordList(_wordList);
      return _wordList;
    }
    return [];
  };

  const resetWordList = () => {
    setWordList([]);
  };

  const updateWordList = async (word: string, id: number) => {
    let isSelected;
    if (wordList.includes(word)) {
      setWordList((currentWordlist) =>
        currentWordlist.filter((item) => item !== word)
      );
      isSelected = "FALSE";
    } else {
      setWordList((currentWordList) => [...currentWordList, word]);
      isSelected = "TRUE";
    }
    return await updateField("isSelected", isSelected, id);
  };

  const generateRandomWordList = async () => {
    resetWordList();
    await query("UPDATE dictionary SET isSelected = 'FALSE'");
    const limit = 5;
    const sqlQuery =
      "SELECT word, id FROM dictionary ORDER BY RANDOM() LIMIT ?";
    const result = await query(sqlQuery, [limit]);
    setWordList(result.map((item) => item.word));
    for (let i = 0; i < result.length; i++) {
      let r = result[i];
      await updateField("isSelected", "TRUE", r.id);
    }
    getDictionary();
  };

  const addToList = async () => {
    const limit = 5 - wordList.length;
    const sqlQuery =
      "SELECT word, id FROM dictionary ORDER BY RANDOM() LIMIT ?";
    const result = await query(sqlQuery, [limit]);
    setWordList(result.map((item) => item.word));
    for (let i = 0; i < result.length; i++) {
      let r = result[i];
      await updateField("isSelected", "TRUE", r.id);
    }
    getDictionary();
  };

  const removeWordFromList = async (wordObject: IDictionary) => {
    await updateWordList(wordObject.word, wordObject.id);
    getDictionary();
  };

  const values: AppData = {
    dictionaryLoading,
    dictionary,
    getDictionary,
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
  };

  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};
