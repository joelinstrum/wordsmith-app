import useQuery from "./useQuery";

const useWordQuery = () => {
  const query = useQuery();
  const getWord = async (word: string) => {
    const sql = "SELECT * FROM dictionary WHERE word = ?";
    const result = await query(sql, [word]);
    return result[0];
  };

  const updateWordSelected = async (id: number, addWord: "TRUE" | "FALSE") => {
    let sql = "UPDATE dictionary set isSelected = ? WHERE id = ?";
    let result = await query(sql, [addWord, id]);
    sql = "SELECT * FROM dictionary WHERE isSelected = 'TRUE'";
    return await query(sql);
  };

  return { getWord, updateWordSelected };
};

export default useWordQuery;
