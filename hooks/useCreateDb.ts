import jsonData from "assets/data/wordsmith_dictionary.json";
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
            etymology TEXT
          );`;
      await query(
        sql,
        [],
        (result) => {
          if (result.length) {
            console.log("Table created");
          }
        },
        () => {
          console.log("Error creating table");
        }
      );
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  const populateTable = async (forceCreation = false, force = false) => {
    let doInsertData = true;

    try {
      if (forceCreation) {
        await createTable();
      }

      // Check if the table exists
      const sql = "SELECT name FROM sqlite_master WHERE type=? AND name=?";
      await query(sql, ["table", "dictionary"], (rows) => {
        if (rows.length) {
          createTable();
        }
      });

      // Check if force is true and delete existing records
      if (force) {
        const sql = "DELETE FROM dictionary;";
        await query(sql, [], () => {
          return true;
        });
      } else {
        // If force is false and there are existing records, return
        const sql = "SELECT COUNT(*) as count FROM dictionary";
        await query(sql, [], (result) => {
          if (result) {
            console.log(result);
            console.log("Table already populated, skipping.");
            doInsertData = false;
          } else {
            doInsertData = true;
          }
        });
      }

      if (doInsertData) {
        console.log("Insert the data...");
        for (const item of jsonData) {
          const sql =
            "INSERT INTO dictionary (word, category, dateAdded, meaning, etymology) VALUES (?, ?, ?, ?, ?);";
          await query(
            sql,
            [
              item.word,
              item.category,
              item.dateAdded,
              item.meaning,
              item.etymology,
            ],
            () => {}
          );
        }
        console.log("Table populated successfully");
      }
    } catch (error) {
      console.error("Error populating table:", JSON.stringify(error));
    }
  };
  return { createTable, populateTable };
};

export default useCreateDb;
