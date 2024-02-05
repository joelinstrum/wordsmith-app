import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
  ButtonBackHome,
  Loader,
  Separator,
  WordDrill,
} from "components";
import { useAppData } from "context/AppDataContext";
import { useTheme } from "context/ThemeContext";
import useWordQuery from "hooks/useWordQuery";
import { useState } from "react";
import { Text, View } from "react-native";
import { pause } from "utils/utilities";

let drillIndex = 0;

const WordDrills: React.FC = () => {
  const theme = useTheme();
  const { wordList, generateRandomWordList, removeWordFromList } = useAppData();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState<IDictionary>();
  const { getWord } = useWordQuery();

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

  const onRemoveWord = () => {
    if (currentWord) {
      removeWordFromList(currentWord);
    }
  };

  return (
    <View style={theme.container.screen}>
      <Separator height={50} />
      <View style={theme.container.body}>
        <ButtonBackHome />
        <Text style={theme.container.screenText}>Word Drills</Text>
        {isLoading ? (
          <Loader isLoading={true} message="Loading random words" />
        ) : (
          <>
            {!wordList || !wordList.length ? (
              <View>
                <Separator height={20} />
                <Text style={theme.container.screenText}>
                  You can't run any word drills because you haven't selected any
                  words from the dictionary
                </Text>
                <Separator height={20} />
                <Button
                  style={theme.button.settings}
                  title="Generate ten words randomly"
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
                    onRemove={onRemoveWord}
                  />
                ) : (
                  <>
                    <Text style={theme.container.screenText}>
                      You have {wordList.length} words in your drill list.
                    </Text>
                    <Separator height={20} />
                    <Button
                      style={theme.button.settings}
                      title="Start the drill!"
                      onPress={() => {
                        setHasStarted(true);
                        doWordDrill();
                      }}
                    />
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
