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
  const [hasDictionary, setHasDictionary] = useState(false);
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
  }, [trigger]);

  useEffect(() => {
    getHasDictionary();
  }, []);

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
      setDictionary([]);
      setDictionaryLoading(false);
    }
    return;
  };

  const getHasDictionary = async () => {
    const sql = `SELECT count(*) as count from dictionary `;
    try {
      const data = await query(sql, []);
      if (data && data[0]?.count) {
        setHasDictionary(true);
      } else {
        setHasDictionary(false);
      }
    } catch (e) {
      setHasDictionary(false);
    }
  };

  const updateField = async (
    field: string,
    value: string | number,
    id: number
  ) => {
    const sql = `UPDATE dictionary SET ${field} = '${value}' WHERE id = ${id}`;
    try {
      await query(sql, []);
    } catch (e) {
      console.log("Error in the system");
    }
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
    hasDictionary,
    updateField,
  };
};

export default useGetDictionary;
