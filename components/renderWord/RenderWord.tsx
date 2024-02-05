import { useAppData } from "context/AppDataContext";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import getTheme from "themes/theme";

interface DictionaryWordProps {
  wordObject: IDictionary;
  showAddRemoveCheckbox?: boolean;
}

const RenderWord: React.FC<DictionaryWordProps> = ({
  wordObject,
  showAddRemoveCheckbox = true,
}) => {
  const theme = getTheme();
  const [isChecked, setIsChecked] = useState<boolean>();
  const [checkedLabel, setCheckedLabel] = useState("");
  const { updateWordList } = useAppData();

  useEffect(() => {
    const checked = wordObject.isSelected === "TRUE";
    setIsChecked(checked);
    setCheckedLabel(checked ? "Remove from drill" : "Add to drill");
  }, [wordObject.isSelected]);

  const pressChecked = () => {
    setCheckedLabel(isChecked ? "Add to drill" : "Remove from drill");
    setIsChecked(!isChecked);
    updateWordList(wordObject.word, wordObject.id);
  };

  return (
    <View style={theme.container.wordDrill}>
      <View style={theme.container.wordDrillRow}>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillLabel}>Word:</Text>
        </View>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillValue}>
            "{wordObject.word}"
          </Text>
        </View>
      </View>
      <View style={theme.container.wordDrillRow}>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillLabel}>Meaning:</Text>
        </View>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillValue}>
            {wordObject.meaning}
          </Text>
        </View>
      </View>
      <View style={theme.container.wordDrillRow}>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillLabel}>Category:</Text>
        </View>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillValue}>
            {wordObject.category}
          </Text>
        </View>
      </View>
      <View style={theme.container.wordDrillRow}>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillLabel}>Usage:</Text>
        </View>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillValue}>{wordObject.usage}</Text>
        </View>
      </View>
      <View style={theme.container.wordDrillRow}>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillLabel}>Date added:</Text>
        </View>
        <View style={theme.container.col}>
          <Text style={theme.container.wordDrillValue}>
            {wordObject.dateAdded}
          </Text>
        </View>
      </View>
      {showAddRemoveCheckbox && (
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}> </Text>
          </View>
          <View
            style={[
              theme.container.row,
              { justifyItems: "center", alignItems: "center", width: 200 },
            ]}
          >
            <View>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={pressChecked}
              />
            </View>

            <Text style={theme.container.screenText}>{checkedLabel}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default RenderWord;
