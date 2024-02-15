import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { Checkbox, DataTable } from "react-native-paper";
import { getCategory } from "utils/utilities";

interface DictionaryItemProps {
  item: IDictionary;
  onWordPress: (wordObject: IDictionary, index: number) => void;
  index: number;
}

const DictionaryItem: React.FC<DictionaryItemProps> = ({
  item,
  onWordPress,
  index,
}) => {
  const { theme } = useTheme();
  const { wordList, updateWordList } = useAppData();

  const pressCheckbox = () => {
    updateWordList(item.word, item.id);
  };

  return (
    <DataTable.Row key={item.id} style={theme.dataTable.row}>
      <DataTable.Cell textStyle={theme.dataTable.rowText} style={{ flex: 1 }}>
        <Checkbox
          status={
            wordList && wordList.includes(item.word) ? "checked" : "unchecked"
          }
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
        {getCategory(item.category)}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default DictionaryItem;
