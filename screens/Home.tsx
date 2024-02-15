import { Loader, Logo, Menu, Separator } from "components";
import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import useReloadDictionary from "hooks/useReloadDictionary";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { pause } from "utils/utilities";

const Home: React.FC = () => {
  const { theme } = useTheme();
  const {
    hasInitialized,
    hasDictionary,
    dictionary,
    getWordList,
    getDictionary,
    hasDictionaryError,
  } = useAppData();
  const [isLoading, setIsLoading] = useState(true);
  const { reloadDictionary } = useReloadDictionary();
  const [loadingMessage, setLoadingMessage] = useState("loading");

  useEffect(() => {
    if (hasDictionary) {
      setIsLoading(false);
    }
  }, [hasDictionary]);

  useEffect(() => {
    const doReloadAsync = async () => {
      setLoadingMessage("Copying dictionary");
      await reloadDictionary();
      await pause(0.5);
      setLoadingMessage("initializing database");
      await pause(1);
      setLoadingMessage("Complete...");
      await pause(1);
      setIsLoading(false);
    };
    if (hasDictionaryError) {
      doReloadAsync();
    }
  }, [hasDictionaryError]);

  useEffect(() => {
    getDictionary();
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
        {isLoading ? (
          <Loader isLoading={isLoading} message={loadingMessage} />
        ) : (
          <Menu />
        )}
      </View>
    </>
  );
};

export default Home;
