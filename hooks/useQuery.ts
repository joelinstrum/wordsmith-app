import { useDatabase } from "context/DatabaseContext";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

export type SuccessCallback = (resultArray: any[]) => void;
export type ErrorCallback = (error: any) => void;
type SQLiteDatabase = SQLite.WebSQLDatabase;

const useQuery = () => {
  const { db, initDb } = useDatabase();

  useEffect(() => {
    console.log("Use effect has been called");
    if (db) {
      console.log("DB is now registered");
    }
  }, [db, initDb]); // Include db and initDb in the dependency array

  const query = async (
    sqlQuery: string,
    params: any[],
    successCallback: SuccessCallback,
    errorCallback?: ErrorCallback
  ) => {
    console.log("Query has been called");
    if (!db) {
      return;
    }
    let openedDb: SQLiteDatabase = db;
    if (!openedDb) {
      openedDb = (await initDb()) as SQLiteDatabase;
    }

    try {
      openedDb.transaction((tx) => {
        tx.executeSql(
          sqlQuery,
          params,
          (_, resultSet) => {
            console.log("ROWS: ", resultSet.rows._array.length);
            successCallback(resultSet.rows._array);
          },
          (_, error) => {
            console.log(error);
            if (errorCallback) {
              errorCallback(error);
            }
            return true;
          }
        );
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return query;
};

export default useQuery;
