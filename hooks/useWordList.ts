import { useEffect, useState } from "react";
import useQuery from "./useQuery";
import useSpeakOptions from "./useSpeakOptions";
import useWordQuery from "./useWordQuery";

type TUpdateField = (field: string, isSelected: string, id: number) => void;

const useWordList = (
  dictionary: IDictionary[],
  updateField: TUpdateField,
  triggerDictionary: VoidFunction
) => {
  const [wordList, setWordList] = useState<string[]>([]);
  const query = useQuery();
  const { getWord } = useWordQuery();
  const { numberOfDrillWords } = useSpeakOptions();

  const getWordList = () => {
    if (dictionary && dictionary.length) {
      const _wordList = dictionary
        .filter((item: IDictionary) => item.isSelected === "true")
        .map((item) => item.word);
      setWordList(_wordList);
      return _wordList;
    }
    return [];
  };

  useEffect(() => {
    getWordList();
  }, [dictionary.length]);

  const resetWordList = () => {
    setWordList([]);
  };

  const updateWordList = async (word: string, id: number) => {
    let isSelected;
    if (wordList.includes(word)) {
      const wordListWithoutWord = wordList.filter((item) => item !== word);
      setWordList(wordListWithoutWord);
      isSelected = "false";
    } else {
      setWordList((currentWordList) => [...currentWordList, word]);
      isSelected = "true";
    }
    return await updateField("isSelected", isSelected, id);
  };

  const removeWordFromList = async (wordObject: IDictionary) => {
    return await updateWordList(wordObject.word, wordObject.id);
  };

  const addToList = async (limit?: number) => {
    if (!limit) {
      limit = numberOfDrillWords - wordList.length;
    }
    const sqlQuery =
      "SELECT word, id FROM dictionary ORDER BY RANDOM() LIMIT ?";
    const result = await query(sqlQuery, [limit]);
    const items = result.map((item) => item.word);
    setWordList((currentWordList) => [...currentWordList, ...items]);
    for (let i = 0; i < result.length; i++) {
      let r = result[i];
      await updateField("isSelected", "true", r.id);
    }
    triggerDictionary();
  };

  const replaceWordInList = async (
    wordItem: IDictionary | string,
    limit: number
  ) => {
    let wordObject;
    if (typeof wordItem === "string") {
      wordObject = await getWord(wordItem);
    } else {
      wordObject = wordItem;
    }
    await updateWordList(wordObject.word, wordObject.id);
    await addToList(limit);
    triggerDictionary();
  };

  const deleteWordFromList = async (wordItem: IDictionary | string) => {
    let wordObject;
    if (typeof wordItem === "string") {
      wordObject = await getWord(wordItem);
    } else {
      wordObject = wordItem;
    }
    await updateWordList(wordObject.word, wordObject.id);
    triggerDictionary();
  };

  const generateRandomWordList = async () => {
    resetWordList();
    await query("UPDATE dictionary SET isSelected = 'false'");
    const sqlQuery =
      "SELECT word, id FROM dictionary ORDER BY RANDOM() LIMIT ?";
    const result = await query(sqlQuery, [numberOfDrillWords]);
    setWordList(result.map((item) => item.word));
    for (let i = 0; i < result.length; i++) {
      let r = result[i];
      await updateField("isSelected", "true", r.id);
    }
    triggerDictionary();
    return;
  };

  const isInWordList = (word: string) => {
    return wordList.some((w) => w === word);
  };

  return {
    wordList,
    getWordList,
    resetWordList,
    updateWordList,
    removeWordFromList,
    addToList,
    replaceWordInList,
    generateRandomWordList,
    isInWordList,
    deleteWordFromList,
  };
};

export default useWordList;
