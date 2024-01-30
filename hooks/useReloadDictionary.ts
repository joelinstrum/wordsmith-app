import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { pause } from "utils/utilities";
import useQuery from "./useQuery";

const useReloadDictionary = () => {
  const [loadingDictionary, setLoadingDictionary] = useState(false);
  const query = useQuery();

  const reloadDictionary = () => {
    const doReload = async () => {
      await pause(0.5);
      await copyOriginalDb();
      setLoadingDictionary(false);
    };
    setLoadingDictionary(true);
    doReload();
  };

  const copyOriginalDb = async () => {
    const dbName = "wordsmith-app.db";
    const assetDBPath = FileSystem.documentDirectory + "SQLite/";
    const assetDBUri = `${assetDBPath}${dbName}`;
    readDirectory(FileSystem.documentDirectory + "assets");

    try {
      // Check if the directory exists, create it if not
      const directoryInfo = await FileSystem.getInfoAsync(assetDBPath);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(assetDBPath, {
          intermediates: true,
        });
      }

      // Check if the database file exists
      const dbInfo = await FileSystem.getInfoAsync(assetDBUri);
      // You may want to handle copying differently based on your use case
      // For simplicity, this example assumes you've placed the file in the assets directory
      const sourceUri = require("assets/data/dictionary_database.db");
      if (sourceUri) {
        await FileSystem.copyAsync({
          from: sourceUri,
          to: assetDBUri,
        });
      } else {
        console.error("File not found: ", sourceUri);
        return false;
      }

      console.log("Database copied successfully!");
    } catch (error) {
      console.warn("Error copying database: ", error);
    }
  };

  const readDirectory = async (directoryPath: string) => {
    try {
      const directoryInfo = await FileSystem.getInfoAsync(directoryPath);

      if (directoryInfo.isDirectory) {
        const contents = await FileSystem.readDirectoryAsync(directoryPath);

        for (const item of contents) {
          const fullPath = `${directoryPath}/${item}`;

          // Check if the item is a file or directory
          const itemInfo = await FileSystem.getInfoAsync(fullPath);

          if (itemInfo.isDirectory) {
            // If it's a directory, recursively read its contents
            await readDirectory(fullPath);
          } else {
            // If it's a file, log its path
            console.log(fullPath);
          }
        }
      } else {
        console.error("Provided path is not a directory:", directoryPath);
      }
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  };

  const removeDictionary = async () => {
    const sql = "DROP TABLE IF EXISTS dictionary";
    return await query(sql, []);
  };

  const deleteDb = async () => {
    const dbFilePath = `${FileSystem.documentDirectory}wordsmith.db`;

    try {
      await FileSystem.deleteAsync(dbFilePath, { idempotent: true });
      console.log("Database file deleted successfully.");
      return true;
    } catch (error) {
      console.error("Error deleting database file:", error);
      throw error;
    }
  };

  const createDictionaryTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS dictionary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            category TEXT,
            dateAdded DATE,
            meaning TEXT,
            usage TEXT,
            etymology TEXT
          );`;
    return await query(sql, []);
  };

  const createTable = async () => {
    await removeDictionary();
    return await createDictionaryTable();
  };

  // const saveDictionaryToFile = async (filePath: string) => {
  //   try {
  //     // Convert the JSON data to a string
  //     const jsonString = JSON.stringify(dictionaryJson, null, 2);

  //     // Write the JSON string to the file
  //     await FileSystem.writeAsStringAsync(filePath, jsonString, {
  //       encoding: FileSystem.EncodingType.UTF8,
  //     });

  //     // After saving, import the data into the database
  //     await importDataFileIntoDB(filePath);

  //     setLoadingDictionary(false);
  //   } catch (error) {
  //     console.error("Error saving dictionary to file:", error);
  //     setLoadingDictionary(false);

  //     // Handle the error accordingly, e.g., show an error message to the user
  //     throw error; // rethrow the error for further handling if needed
  //   }
  // };

  const importDataFileIntoDB = async (filePath: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileContent = await FileSystem.readAsStringAsync(filePath, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        const jsonData = JSON.parse(fileContent);

        // Assuming you have an "insert" SQL query to insert data into the "dictionary" table
        const insertQuery =
          "INSERT INTO dictionary (word, category, dateAdded, meaning, usage, etymology) VALUES (?, ?, ?, ?, ?, ?)";

        // Loop through the JSON data and execute the insert query for each entry
        for (const entry of jsonData) {
          const values = Object.values(entry);
          await query(insertQuery, values);
        }

        console.log("Data imported into the database.");
        resolve(true);
      } catch (error) {
        console.error("Error importing data into the database:", error);
        reject(error);
      }
    });
  };

  return {
    reloadDictionary,
    removeDictionary,
    loadingDictionary,
  };
};

export default useReloadDictionary;
