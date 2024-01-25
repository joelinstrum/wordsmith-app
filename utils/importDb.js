import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export async function openDatabaseIShipWithApp() {
  try {
    const internalDbName = "ws_dictionary.sqlite"; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
      console.log("File does not yet exist");
      await FileSystem.makeDirectoryAsync(sqlDir, { intermediates: true });
      const asset = Asset.fromModule(
        require("assets/data/dictionary_database.db")
      );
      await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
  } catch (e) {
    console.log(`Could not copy file ${e}`);
  }
}
