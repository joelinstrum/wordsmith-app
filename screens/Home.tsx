import { Loader, Logo, Menu, Separator } from "components";
import { useAppData } from "context/AppDataContext";
import { useTheme } from "context/ThemeContext";
import useReloadDictionary from "hooks/useReloadDictionary";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Home: React.FC = () => {
  const theme = useTheme();
  const { hasInitialized, hasDictionary, dictionary } = useAppData();
  const [isLoading, setIsLoading] = useState(true);
  const { reloadDictionary } = useReloadDictionary();

  useEffect(() => {
    if (dictionary && dictionary.length) {
      setIsLoading(false);
    } else if (hasInitialized && hasDictionary) {
      setIsLoading(false);
    } else if (hasInitialized && !hasDictionary) {
      // reloadDictionary();
    }
  }, [hasInitialized, hasDictionary, dictionary]);

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
