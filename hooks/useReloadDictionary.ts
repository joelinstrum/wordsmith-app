import { useAppData } from "context/AppDataContext";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

const useReloadDictionary = () => {
  const [loadingDictionary, setLoadingDictionary] = useState(false);
  const { getDictionary } = useAppData();

  const doReload = async () => {
    try {
      await copyOriginalDb();
      return true;
    } catch (e) {
      throw e;
    }
  };

  const reloadDictionary = async () => {
    setLoadingDictionary(true);
    try {
      await doReload(); // This is where we await the asynchronous function
      setLoadingDictionary(false);
    } catch (error) {
      console.error("Error reloading dictionary:", error);
      setLoadingDictionary(false); // Ensure loading state is set to false in case of error
    }
  };

  const copyOriginalDb = async () => {
    const destinationFilePath = `${FileSystem.documentDirectory}SQLite/wordsmith.db`;
    return new Promise(async (accept, reject) => {
      try {
        const asset = Asset.fromModule(
          require("assets/data/dictionary_database.db")
        );
        await asset.downloadAsync();
        const localUri: string = asset.localUri!;

        await FileSystem.copyAsync({
          from: localUri,
          to: destinationFilePath,
        });
        accept(true);
      } catch (error) {
        reject(error);
        console.error("Error copying database file:", error);
        throw error;
      }
    });
  };

  const removeDictionary = async () => {
    const destinationFilePath = `${FileSystem.documentDirectory}SQLite/wordsmith.db`;
    const fileInfo = await FileSystem.getInfoAsync(destinationFilePath);

    if (!fileInfo.exists) {
      console.log("wordsmith.db file does not exist");
      return; // If the file doesn't exist, return from the function
    }

    try {
      await FileSystem.deleteAsync(destinationFilePath, { idempotent: true });
    } catch (error) {
      console.error("Error deleting wordsmith.db file:", error);
      throw error;
    }
    await getDictionary();
    return;
  };

  return {
    reloadDictionary,
    removeDictionary,
    loadingDictionary,
  };
};

export default useReloadDictionary;
