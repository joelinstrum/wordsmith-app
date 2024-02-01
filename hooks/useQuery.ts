import { useDatabase } from "context/DatabaseContext";
import * as SQLite from "expo-sqlite";

export type SuccessCallback = (resultArray: any[]) => void;
export type ErrorCallback = (error: any) => void;
type SQLiteDatabase = SQLite.WebSQLDatabase;

const useQuery = () => {
  const { db, initDb } = useDatabase();

  const query = (sqlQuery: string, params: any[]): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
      if (!db) {
        console.warn("No db, returning");
        reject("No database available");
        return;
      }

      let openedDb: SQLiteDatabase = db;
      openedDb.transaction(
        (tx) => {
          tx.executeSql(
            sqlQuery,
            params,
            (_, resultSet) => {
              resolve(resultSet.rows._array);
              return true;
            },
            (_, error) => {
              reject(error);
              return true;
            }
          );
        },
        (transactionError) => {
          console.log("Transaction error:", transactionError);
          reject(transactionError);
        },
        () => {
          // Transaction successful
        }
      );
    });
  };

  return query;
};

export default useQuery;
