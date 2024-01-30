// useGetDictionary.ts
import { useEffect, useState } from "react";
import { getTimestamp } from "utils/utilities";
import useQuery from "./useQuery";

const useGetDictionary = () => {
  const query = useQuery();
  const [dictionary, setDictionary] = useState<IDictionary[]>([]);
  const [trigger, setTrigger] = useState<Number | undefined>();
  const [previousTrigger, setPreviousTrigger] = useState<Number | undefined>(0);
  const [dictionaryLoading, setDictionaryLoading] = useState(false);
  let sortDirection = "asc";
  let sortColumn = "word";

  useEffect(() => {
    if (trigger !== previousTrigger) {
      const doGetDictionary = async () => {
        setPreviousTrigger(trigger);
        setDictionaryLoading(true);
      };
      doGetDictionary();
    }
  }),
    [trigger];

  useEffect(() => {
    if (dictionaryLoading) {
      const doUpdate = async () => {
        await getDictionary();
        setDictionaryLoading(false);
      };
      doUpdate();
    }
  }, [dictionaryLoading]);

  const getDictionary = async () => {
    const sql = `SELECT * FROM dictionary ORDER BY ${sortColumn} ${sortDirection};`;
    try {
      const data = await query(sql, []);
      setDictionary(data);
    } catch (e) {
      console.log("ERROR: ", e);
      setDictionaryLoading(false);
    }
    return;
  };

  const triggerDictionaryQuery = () => {
    setTrigger(getTimestamp());
  };

  const sort = (sortColumn: string) => {
    console.log("SORT: ", sortColumn);
  };

  return {
    dictionary,
    dictionaryLoading,
    getDictionary,
    triggerDictionaryQuery,
    sort,
  };
};

export default useGetDictionary;
