import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
  ButtonBackHome,
  Loader,
  Separator,
  WordDrill,
  WordDrillListItem,
} from "components";
import { useAppData } from "context/AppDataContext";
import { useThemeContext as useTheme } from "context/ThemeContext";
import useWordQuery from "hooks/useWordQuery";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import constants from "utils/constants";
import { pause } from "utils/utilities";

let drillIndex = 0;

const WordDrills: React.FC = () => {
  const { theme } = useTheme();
  const {
    getWordList,
    wordList,
    generateRandomWordList,
    replaceWordInList,
    deleteWordFromList,
  } = useAppData();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState<IDictionary>();
  const { getWord } = useWordQuery();

  useEffect(() => {
    getWordList();
  }, []);

  const generateRandomWords = () => {
    const generate = async () => {
      setIsLoading(true);
      generateRandomWordList();
      await pause(0.5);
      setIsLoading(false);
    };
    generate();
  };

  const doWordDrill = () => {
    const wordDrill = async () => {
      const wordObject = await getWord(wordList[drillIndex]);
      setCurrentWord(wordObject);
    };
    wordDrill();
  };

  const onSkipDrill = () => {
    onAudioComplete();
  };

  const onAudioComplete = () => {
    if (drillIndex === wordList.length - 1) {
      drillIndex = 0;
    } else {
      drillIndex++;
    }
    doWordDrill();
  };

  const replaceCurrentWord = () => {
    if (currentWord) {
      replaceWordInList(currentWord, 1);
    }
  };

  const onReplace = (word: string) => {
    const doAsyncRemove = async () => {
      setIsLoading(true);
      replaceWordInList(word, 1);
      await pause(0.5);
      setIsLoading(false);
    };
    doAsyncRemove();
  };

  const deleteWord = (word: string) => {
    const doAsyncRemove = async () => {
      setIsLoading(true);
      deleteWordFromList(word);
      await pause(0.5);
      setIsLoading(false);
    };
    doAsyncRemove();
  };

  const pressBack = () => {
    setCurrentWord(undefined);
  };

  return (
    <View style={theme.container.screen}>
      <Separator height={50} />
      <View style={theme.container.body}>
        <ButtonBackHome beforeReturn={pressBack} />
        <View style={theme.container.pageHeader}>
          <Text style={theme.container.pageHeaderText}>Word Drills</Text>
        </View>
        {isLoading ? (
          <Loader isLoading={true} message="Loading random words" />
        ) : (
          <>
            {!wordList || !wordList.length ? (
              <View style={theme.container.contentContainer}>
                <Separator height={20} />
                <Text style={theme.container.screenText}>
                  You can't run any word drills because you haven't selected any
                  words from the dictionary
                </Text>
                <Separator height={20} />
                <Button
                  style={theme.button.settings}
                  title={`Generate ${constants.DEFAULT_NUMBER_OF_WORDS_IN_DRILLIST} words randomly`}
                  onPress={generateRandomWords}
                >
                  <Ionicons name="add-sharp" size={32} color="gray" />
                </Button>
              </View>
            ) : (
              <View style={theme.container.contentContainer}>
                <Separator height={20} />
                {hasStarted && currentWord ? (
                  <WordDrill
                    word={currentWord}
                    onAudioComplete={onAudioComplete}
                    onSkipDrill={onSkipDrill}
                    onRemove={replaceCurrentWord}
                  />
                ) : (
                  <>
                    <Text style={theme.container.screenText}>
                      You have {wordList.length} words in your drill list.
                    </Text>
                    <Separator height={20} />
                    <View style={theme.container.col}>
                      {wordList.map((wordItem) => (
                        <WordDrillListItem
                          word={wordItem}
                          key={wordItem}
                          replace={onReplace}
                          remove={deleteWord}
                        />
                      ))}
                    </View>
                    {wordList.length && (
                      <>
                        <Button
                          style={theme.button.tertiaryButton}
                          title="Start the drill!"
                          textStyle={theme.button.tertiaryText}
                          onPress={() => {
                            setHasStarted(true);
                            doWordDrill();
                          }}
                        />
                        <View
                          style={[
                            { marginTop: 20 },
                            theme.container.contentContainer,
                          ]}
                        >
                          <Button
                            style={theme.button.settings}
                            textStyle={theme.button.settingsText}
                            title="Replace drill list randomly"
                            onPress={generateRandomWordList}
                          >
                            <Ionicons name="add-sharp" size={32} color="gray" />
                          </Button>
                        </View>
                      </>
                    )}
                  </>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default WordDrills;
