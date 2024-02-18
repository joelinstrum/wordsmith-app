import useGetDictionary from "hooks/useDictionary";
import { useEffect, useState } from "react";
import { getStoredItem } from "utils/utilities";

/* this hooks is used to make sure the required tables & data exist */
export interface AppChecklist {
  hasDictionary: boolean;
  hasWordList: boolean;
  hasVoiceSelected: boolean;
  hasInitialized: boolean;
}

const useAppChecklist = () => {
  const { hasDictionary } = useGetDictionary();
  const [hasWordList, setHasWordList] = useState(false);
  const [hasVoiceSelected, setHasVoiceSelected] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const voice = await getStoredItem("wordsmithApp:voice");
      if (voice) {
        setHasVoiceSelected(true);
      }
      setHasInitialized(true);
    };
    init();
  }, []);

  return {
    hasDictionary,
    hasWordList,
    hasVoiceSelected,
    hasInitialized,
  };
};

export default useAppChecklist;
