import { ButtonBackHome, Separator } from "components";
import { useTheme } from "context/ThemeContext";
import { Text, View } from "react-native";

const Settings: React.FC = () => {
  const theme = useTheme();
  return (
    <View style={theme.container.screen}>
      <Separator height={50} />
      <View style={theme.container.body}>
        <ButtonBackHome />
        <Text style={theme.container.screenText}>Settings & Preferences</Text>
      </View>
    </View>
  );
};

export default Settings;
