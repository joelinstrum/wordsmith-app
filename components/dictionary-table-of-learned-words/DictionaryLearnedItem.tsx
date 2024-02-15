import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { useState } from "react";
import { Checkbox, DataTable } from "react-native-paper";

interface DictionaryLearnedItemProps {
  item: IDictionary;
  onWordPress: (wordObject: IDictionary, index: number) => void;
  index: number;
}

const DictionaryLearnedItem: React.FC<DictionaryLearnedItemProps> = ({
  item,
  onWordPress,
  index,
}) => {
  const { theme } = useTheme();
  const { updateHasLearned } = useAppData();
  const [hasLearned, setHasLearned] = useState(item.hasLearned === "true");

  const pressCheckbox = () => {
    setHasLearned(!hasLearned);
    updateHasLearned(item.id, !hasLearned);
  };

  return (
    <DataTable.Row key={item.id} style={theme.dataTable.row}>
      <DataTable.Cell textStyle={theme.dataTable.rowText} style={{ flex: 1 }}>
        <Checkbox
          status={hasLearned ? "checked" : "unchecked"}
          onPress={pressCheckbox}
          color={theme.colors.checkboxColor}
        />
      </DataTable.Cell>
      <DataTable.Cell
        numeric
        textStyle={theme.dataTable.rowTextLink}
        onPress={() => onWordPress(item, index)}
      >
        {item.word}
      </DataTable.Cell>
      <DataTable.Cell
        numeric
        textStyle={theme.dataTable.rowText}
        style={{ flex: 2 }}
      >
        {item.category}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default DictionaryLearnedItem;
