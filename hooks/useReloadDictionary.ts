import { useAppData } from "context/AppDataContext";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { pause } from "utils/utilities";
import useQuery from "./useQuery";

const useReloadDictionary = () => {
  const [loadingDictionary, setLoadingDictionary] = useState(false);
  const query = useQuery();
  const { getDictionary } = useAppData();

  const reloadDictionary = () => {
    const doReload = async () => {
      await pause(0.5);
      await copyOriginalDb();
      await getDictionary();
      setLoadingDictionary(false);
    };
    setLoadingDictionary(true);
    doReload();
  };

  const copyOriginalDb = async () => {
    const destinationFilePath = `${FileSystem.documentDirectory}SQLite/wordsmith.db`;

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
    } catch (error) {
      console.error("Error copying database file:", error);
      throw error;
    }
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
