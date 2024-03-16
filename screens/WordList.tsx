import { ButtonBackHome, DictionaryTable, Separator } from "components";
import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { View } from "react-native";

const WordList: React.FC = () => {
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
        <DictionaryTable />
      </View>
    </View>
  );
};

export default WordList;
