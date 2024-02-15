import {
  ButtonBackHome,
  DictionaryTableOfLearnedWords,
  Separator,
} from "components";
import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { Text, View } from "react-native";

const WordListLearned: React.FC = () => {
  const { theme } = useTheme();
  const { getDictionary } = useAppData();

  const homePress = async () => {
    await getDictionary();
  };

  return (
    <View style={theme.container.screen}>
      <Separator height={50} />
      <View style={theme.container.body}>
        <ButtonBackHome beforeReturn={homePress} />
        <Text style={theme.container.screenText}>
          List of words you have learned
        </Text>
        <Separator />
        <DictionaryTableOfLearnedWords />
      </View>
    </View>
  );
};

export default WordListLearned;
