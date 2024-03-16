import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "components/button/Button";
import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { useState } from "react";
import { Checkbox, DataTable } from "react-native-paper";
import { getCategory, playWordMp3, playWordNative } from "utils/utilities";

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
  const [evenOdd, setEvenOdd] = useState(0);

  const pressCheckbox = () => {
    updateWordList(item.word, item.id);
  };

  const play = (word: IDictionary) => {
    playWordNative("Nugacity");
    return;
    if (evenOdd === 0) {
      setEvenOdd(1);
      playWordMp3(word.word);
    } else {
      setEvenOdd(0);
      const ttsWord = word.tts || word.word;
      playWordNative(ttsWord);
    }
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
      <DataTable.Cell textStyle={theme.dataTable.rowText} style={{ flex: 1 }}>
        <Button onPress={() => play(item)} style={theme.button.play}>
          <Ionicons name="play" />
        </Button>
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
