import { useEffect, useState } from "react";
import { getStoredItem, setStoredItem } from "utils/utilities";

const useSpeakOptions = () => {
  const [numberOfDrillWords, setNumberOfDrillWords] = useState(0);
  useEffect(() => {
    const getItems = async () => {
      const numberOfDrillWords = await getStoredItem(
        "@WordSmith:numberOfDrillItems"
      );
      if (numberOfDrillWords) {
        setNumberOfDrillWords(parseInt(numberOfDrillWords));
      }
    };
    getItems();
  }, []);

  const storeNumberOfDrillWords = (n: string) => {
    const doStoreNumberOfDrillWords = async () => {
      await setStoredItem("@WordSmith:numberOfDrillItems", n);
      setNumberOfDrillWords(parseInt(n));
    };
    doStoreNumberOfDrillWords();
  };

  return {
    numberOfDrillWords,
    storeNumberOfDrillWords,
  };
};

export default useSpeakOptions;
