import { useEffect, useState } from "react";
import useQuery from "./useQuery";

const useGetLearnedWords = () => {
  useEffect(() => {
    getLearnedWords();
  }, []);

  const [learnedWords, setLearnedWords] = useState<IDictionary[] | undefined>();
  const query = useQuery();

  const getLearnedWords = () => {
    const getLearnedWordsAsync = async () => {
      const sql = `SELECT * from dictionary WHERE hasLearned = 'true' order by word asc`;
      const result = await query(sql);
      setLearnedWords(result);
      return result;
    };
    getLearnedWordsAsync();
  };

  const updateLearnedWord = async (word: IDictionary) => {
    const hasLearned = word.hasLearned === "true" ? "false" : "true";
    const sql = `UPDATE dictionary SET hasLearned = ? where id = ?`;
    const params = [hasLearned, word.id];
    await query(sql, params);
  };

  return {
    learnedWords,
    getLearnedWords,
    updateLearnedWord,
  };
};

export default useGetLearnedWords;
