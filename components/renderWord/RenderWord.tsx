import { useAppData } from "context/AppDataContext";
import { useThemeContext } from "context/ThemeContext";
import useWordQuery from "hooks/useWordQuery";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getCategory, getUsage } from "utils/utilities";
import CheckboxOption from "./CheckboxOption";

interface DictionaryWordProps {
  wordObject: IDictionary;
}

const REMOVE_TEXT = "x Remove from drill";
const ADD_TEXT = "√ Add to drill";

const RenderWord: React.FC<DictionaryWordProps> = ({ wordObject }) => {
  const {
    updateWordList,
    isInWordList,
    updateHasLearned,
    removeWordFromList,
    replaceWordInList,
  } = useAppData();
  const { theme } = useThemeContext();
  const [hasLearned, setHasLearned] = useState<boolean>(false);
  const [stateWordObject, setStateWordObject] = useState<IDictionary>();
  const [addRemoveLabel, setAddRemoveLabel] = useState("");
  const { getWord } = useWordQuery();

  useEffect(() => {
    const getWordAsync = async () => {
      const obj = await getWord(wordObject.word);
      setHasLearned(obj.hasLearned === "true");
      setStateWordObject(obj);
      setAddRemoveLabel(getAddRemoveLabel());
    };
    getWordAsync();
  }, [wordObject]);

  const getAddRemoveLabel = () => {
    return isInWordList(wordObject?.word || "") ? REMOVE_TEXT : ADD_TEXT;
  };

  const pressAddRemoveFromDrill = () => {
    const pattern = /Remove/;
    if (pattern.test(addRemoveLabel)) {
      setAddRemoveLabel(ADD_TEXT);
      removeWordFromList(wordObject);
    } else {
      updateWordList(wordObject.word, wordObject.id);
      setAddRemoveLabel(REMOVE_TEXT);
    }
  };

  const pressHasLearned = () => {
    if (stateWordObject) {
      updateHasLearned(stateWordObject.id, !hasLearned);
      setHasLearned(!hasLearned);
      replaceWordInList(stateWordObject, 1);
    }
  };

  return (
    <ScrollView
      style={theme.container.scrollTable}
      showsVerticalScrollIndicator
    >
      <View style={theme.container.wordDrill}>
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}>Word:</Text>
          </View>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillValue}>
              "{stateWordObject?.word}" - {stateWordObject?.pronunciation}
            </Text>
          </View>
        </View>
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}>Meaning:</Text>
          </View>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillValue} numberOfLines={4}>
              {stateWordObject?.meaning}
            </Text>
          </View>
        </View>
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}>Category:</Text>
          </View>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillValue}>
              {getCategory(stateWordObject?.category || "")}
            </Text>
          </View>
        </View>
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}>Usage:</Text>
          </View>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillValue} numberOfLines={4}>
              {getUsage(stateWordObject?.usage || "")}
            </Text>
          </View>
        </View>
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}>Date added:</Text>
          </View>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillValue}>
              {stateWordObject?.dateAdded}
            </Text>
          </View>
        </View>
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}></Text>
          </View>
          <View style={theme.container.col}>
            <TouchableOpacity onPress={pressAddRemoveFromDrill}>
              <Text style={theme.text.primaryLink}>{addRemoveLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CheckboxOption
          showCheckbox={true}
          label={"Learned"}
          onPress={pressHasLearned}
          isChecked={hasLearned}
        />
      </View>
    </ScrollView>
  );
};

export default RenderWord;
