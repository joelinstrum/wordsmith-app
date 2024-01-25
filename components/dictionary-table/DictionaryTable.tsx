import { useTheme } from "context/ThemeContext";
import useGetDictionary from "hooks/useGetDictionary";
import * as React from "react";
import { useEffect } from "react";
import { DataTable } from "react-native-paper";

const DictionaryTable = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5]);
  const { dictionary, getDictionary } = useGetDictionary();

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    getDictionary();
  }, []);

  useEffect(() => {
    if (dictionary && dictionary.length) {
      console.log(dictionary.length);
    }
  }, [dictionary]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, dictionary.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header style={theme.dataTable.header}>
        <DataTable.Title textStyle={theme.dataTable.headerText}>
          +/-
        </DataTable.Title>
        <DataTable.Title textStyle={theme.dataTable.headerText} numeric>
          Word
        </DataTable.Title>
        <DataTable.Title textStyle={theme.dataTable.headerText} numeric>
          Category
        </DataTable.Title>
      </DataTable.Header>

      {dictionary.slice(from, to).map((item) => (
        <DataTable.Row key={item.id} style={theme.dataTable.row}>
          <DataTable.Cell textStyle={theme.dataTable.rowText}>
            Add/remove
          </DataTable.Cell>
          <DataTable.Cell numeric textStyle={theme.dataTable.rowTextLink}>
            {item.word}
          </DataTable.Cell>
          <DataTable.Cell numeric textStyle={theme.dataTable.rowText}>
            {item.category}
          </DataTable.Cell>
        </DataTable.Row>
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
      />
    </DataTable>
  );
};

export default DictionaryTable;
