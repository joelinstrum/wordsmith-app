import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const DB_NAME = "wordsmith.db";

const useDb = () => {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  const initDb = async () => {
    try {
      // Open the SQLite database
      const dbFile = `${FileSystem.documentDirectory}SQLite/wordsmith.db`;
      // const fileInfo = await FileSystem.getInfoAsync(dbFile);
      const database = await SQLite.openDatabase(DB_NAME);
      SQLite.openDatabase;
      setDb(database);
      return database;
    } catch (error) {
      console.error("Error opening database:", error);
    }
  };

  useEffect(() => {
    initDb();
  }, []);

  return { db, initDb };
};

export default useDb;
