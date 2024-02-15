import useQuery from "./useQuery";

const useCreateDb = () => {
  const query = useQuery();

  const createTable = async () => {
    try {
      // Execute SQL query to create the table
      const sql = `CREATE TABLE IF NOT EXISTS dictionary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            category TEXT,
            dateAdded DATE,
            meaning TEXT,
            usage TEXT,
            etymology TEXT
          );`;
      await query(sql, []);
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  return { createTable };
};

export default useCreateDb;
