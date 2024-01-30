// DatabaseContext.tsx
import useDb from "hooks/useDb";
import React, { ReactNode, createContext, useContext } from "react";

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseContext = createContext<any>(null);

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
}) => {
  const { db, initDb } = useDb();

  return (
    <>
      {db && (
        <DatabaseContext.Provider value={{ db, initDb }}>
          {children}
        </DatabaseContext.Provider>
      )}
    </>
  );
};
