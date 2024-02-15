import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "components/button/Button";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { Text, View } from "react-native";

interface WordDrillListItemProps {
  word: string;
  replace: (word: string) => void;
  remove: (word: string) => void;
}

const WordDrillListItem: React.FC<WordDrillListItemProps> = ({
  word,
  replace,
  remove,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[theme.container.row, { marginBottom: 16 }]} key={word}>
      <View style={[theme.container.colFlexEnd, { minWidth: 130 }]}>
        <Text style={theme.container.screenText}>{word}</Text>
      </View>
      <View
        style={[
          theme.container.colFlexStart,
          { flexDirection: "row", minWidth: 200, display: "flex" },
        ]}
      >
        <Button
          onPress={() => replace(word)}
          title="Replace"
          style={theme.button.replace}
          textStyle={theme.button.primaryText}
        >
          <Ionicons
            name={"refresh-circle"}
            size={32}
            color={theme.primaryTextColor}
          />
        </Button>
        <Button
          onPress={() => remove(word)}
          title=""
          style={theme.button.replace}
        >
          <Ionicons name={"trash-bin"} size={32} color={"#222"} />
        </Button>
      </View>
    </View>
  );
};

export default WordDrillListItem;
