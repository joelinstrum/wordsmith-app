import { Logo, Menu, Separator } from "components";
import { useTheme } from "context/ThemeContext";
import { Text, View } from "react-native";

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <View style={theme.container.screen}>
        <Logo />
        <Separator height={50} />
        <View style={theme.container.body}>
          <Text style={theme.container.screenText}>
            Create an audio drill list from the dictionary of Wordsmith words.
            It's a great way to learn while you go about your day!
          </Text>
        </View>
        <Separator height={50} />
        <Menu />
      </View>
    </>
  );
};

export default Home;
