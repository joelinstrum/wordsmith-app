import Loader from "components/loader/Loader";
import { useAppData } from "context/AppDataContext";
import { useTheme } from "context/ThemeContext";
import * as React from "react";
import { useEffect } from "react";
import { DataTable } from "react-native-paper";
import DictionaryItem from "./DictionaryItem";

interface Dictionary {
  dictionary: IDictionary[];
  getDictionary: () => void;
  dictionaryLoading: boolean;
  setSortColumn: (column: string) => void;
}

const DictionaryTable = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10]);
  const {
    dictionary,
    getDictionary,
    dictionaryLoading,
    setSortColumn,
  }: Dictionary = useAppData();

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    if (dictionary && dictionary.length) {
      console.log(dictionary.length);
    }
  }, [dictionary.length]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, dictionary.length);

  const sortDictionary = (column: string) => {
    setSortColumn(column);
  };

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      {dictionaryLoading ? (
        <Loader isLoading={dictionaryLoading} />
      ) : (
        <DataTable>
          <DataTable.Header style={theme.dataTable.header}>
            <DataTable.Title textStyle={theme.dataTable.headerText}>
              +/-
            </DataTable.Title>
            <DataTable.Title
              textStyle={theme.dataTable.headerText}
              onPress={() => sortDictionary("word")}
              numeric
            >
              Word
            </DataTable.Title>
            <DataTable.Title
              textStyle={theme.dataTable.headerText}
              onPress={() => sortDictionary("category")}
              numeric
            >
              Category
            </DataTable.Title>
          </DataTable.Header>

          {dictionary
            .slice(from, to)
            .map((item: IDictionary, index: number, array: IDictionary[]) => (
              <DictionaryItem item={item} key={item.id} />
            ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(dictionary.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${dictionary.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
            style={[{ backgroundColor: "#aaa" }]}
          />
        </DataTable>
      )}
    </>
  );
};

export default DictionaryTable;
