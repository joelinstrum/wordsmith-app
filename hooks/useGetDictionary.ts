// useGetDictionary.ts
import { useState } from "react";
import useQuery from "./useQuery";

const useGetDictionary = () => {
  const query = useQuery();
  const [dictionary, setDictionary] = useState<IDictionary[]>([]);

  const getDictionary = async () => {
    const sql = "SELECT * FROM dictionary";
    await query(sql, [], (result) => {
      setDictionary(result as never);
    });
  };

  return {
    dictionary,
    getDictionary,
  };
};

export default useGetDictionary;
