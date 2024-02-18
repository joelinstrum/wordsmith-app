// useGetDictionary.ts
import { useEffect, useState } from "react";
import { getTimestamp, pause } from "utils/utilities";
import useQuery from "./useQuery";

const useGetDictionary = () => {
  const query = useQuery();
  const [dictionary, setDictionary] = useState<IDictionary[]>([]);
  const [trigger, setTrigger] = useState<Number | undefined>();
  const [previousTrigger, setPreviousTrigger] = useState<Number | undefined>(0);
  const [dictionaryLoading, setDictionaryLoading] = useState(false);
  const [hasDictionary, setHasDictionary] = useState(false);
  const [hasDictionaryError, setHasDictionaryError] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("word");

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
    const sql = `SELECT * FROM dictionary ORDER BY isSelected DESC, ${sortColumn} COLLATE NOCASE ${sortDirection};`;
    try {
      setHasDictionaryError(false);
      const data = await query(sql, []);
      setDictionary(data);
      setDictionaryLoading(false);
      return;
    } catch (e) {
      setDictionary([]);
      setDictionaryLoading(false);
      setHasDictionaryError(true);
      return;
    }
  };

  const getHasDictionary = async () => {
    const sql = `SELECT count(*) as count from dictionary `;
    try {
      const data = await query(sql, []);
      if (data && data[0]?.count) {
        setHasDictionary(true);
        getDictionary();
      } else {
        setHasDictionary(false);
      }
    } catch (e) {
      setHasDictionary(false);
      setHasDictionaryError(true);
    }
  };

  const updateField = async (
    field: string,
    value: string | number,
    id: number
  ) => {
    const sql = `UPDATE dictionary SET ${field} = '${value}' WHERE id = ${id}`;
    try {
      return await query(sql);
    } catch (e) {
      console.log("Error in the system");
    }
  };

  const triggerDictionaryQuery = () => {
    setTrigger(getTimestamp());
  };

  const sort = (sortColumn: string) => {
    const doSort = async () => {
      setSortColumn(sortColumn);
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      await pause(0.1);
      getDictionary();
    };
    doSort();
  };

  return {
    dictionary,
    dictionaryLoading,
    getDictionary,
    triggerDictionaryQuery,
    sort,
    sortColumn,
    sortDirection,
    hasDictionary,
    setHasDictionaryError,
    updateField,
    hasDictionaryError,
  };
};

export default useGetDictionary;
