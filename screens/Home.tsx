import { Loader, Logo, Menu, Separator } from "components";
import { useTheme } from "context/ThemeContext";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { pause } from "utils/utilities";

const Home: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setLoader = async () => {
      await pause(2);
      setIsLoading(false);
    };
    setLoader();
  }, []);
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
        {isLoading ? <Loader isLoading={isLoading} /> : <Menu />}
      </View>
    </>
  );
};

export default Home;
