import { useAppData } from "context/AppDataContext";
import { useTheme } from "context/ThemeContext";
import { Checkbox, DataTable } from "react-native-paper";

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
  const theme = useTheme();
  const { wordList, updateWordList } = useAppData();

  const pressCheckbox = () => {
    updateWordList(item.word, item.id);
  };

  return (
    <DataTable.Row key={item.id} style={theme.dataTable.row}>
      <DataTable.Cell textStyle={theme.dataTable.rowText}>
        <Checkbox
          status={
            wordList && wordList.includes(item.word) ? "checked" : "unchecked"
          }
          onPress={pressCheckbox}
        />
      </DataTable.Cell>
      <DataTable.Cell
        numeric
        textStyle={theme.dataTable.rowTextLink}
        onPress={() => onWordPress(item, index)}
      >
        {item.word}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={theme.dataTable.rowText}>
        {item.category}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default DictionaryItem;
