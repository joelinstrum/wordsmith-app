import { useAppData } from "context/AppDataContext";
import { useTheme } from "context/ThemeContext";
import { useState } from "react";
import { Checkbox, DataTable } from "react-native-paper";

interface DictionaryItemProps {
  item: IDictionary;
}

const DictionaryItem: React.FC<DictionaryItemProps> = ({ item }) => {
  const theme = useTheme();
  const { updateField } = useAppData();

  const [checked, setChecked] = useState(
    item.isSelected.toUpperCase() === "TRUE"
  );

  const pressCheckbox = () => {
    if (checked) {
      updateField("isSelected", "FALSE", item.id);
    } else {
      updateField("isSelected", "TRUE", item.id);
    }
  };

  return (
    <DataTable.Row key={item.id} style={theme.dataTable.row}>
      <DataTable.Cell textStyle={theme.dataTable.rowText}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={pressCheckbox}
        />
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={theme.dataTable.rowTextLink}>
        {item.word}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={theme.dataTable.rowText}>
        {item.category}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default DictionaryItem;
