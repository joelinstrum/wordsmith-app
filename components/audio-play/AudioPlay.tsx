import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "components/button/Button";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import getTheme from "themes/theme";
import { pause } from "utils/utilities";

interface AudioPlayProps {
  word: IDictionary;
  options: object;
  onAudioComplete: VoidFunction;
  onSkipDrill: VoidFunction;
  onRemove: VoidFunction;
}

const AudioPlay: React.FC<AudioPlayProps> = ({
  word,
  options,
  onAudioComplete,
  onSkipDrill,
  onRemove,
}) => {
  const [pauseVoice, setPauseVoice] = useState(false);
  const [showSkipping, setShowSkipping] = useState(false);
  const theme = getTheme();

  const getUsage = (inputString: string) => {
    var goodQuotes = inputString.replace(/[“”]/g, '"');
    const match = goodQuotes.match(/"([^"]*)"/);
    return match ? match[1] : inputString;
  };

  const speak = (wordsToSpeak: string, voiceOptions: any, pauseAfter = 0) => {
    return new Promise((resolve, reject) => {
      if (pauseVoice) {
        resolve(true);
      }
      const _voiceOptions = {
        ...voiceOptions,
        ...{
          onDone: async () => {
            try {
              await pause(pauseAfter);
              resolve(true);
            } catch (e) {
              console.warn(e);
              reject(e);
            }
          },
        },
      };
      Speech.speak(wordsToSpeak, _voiceOptions);
    });
  };

  useEffect(() => {
    const doAudio = async () => {
      if (pauseVoice) {
        Speech.stop();
        return;
      }
      const usage = getUsage(word.usage);
      await speak(`The word is`, options, 0.5);
      await speak(word.word, options);
      await speak(`${word.word} definition`, options, 0.5);
      await speak(word.meaning, options, 1);
      await speak(`Some usages of ${word.word} `, options, 0.5);
      await speak(usage, options);
      onAudioComplete();
    };
    doAudio();
  }, [word, pauseVoice]);

  const pressPause = () => {
    Speech.stop();
    setPauseVoice(!pauseVoice);
  };

  const pressSkip = () => {
    setShowSkipping(true);
    const doSkip = async () => {
      Speech.stop();
      onSkipDrill();
    };
    doSkip();
  };

  const pressRemove = () => {
    const doRemove = async () => {
      Speech.stop();
      setPauseVoice(true);
      onRemove();
    };
    doRemove();
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return (
    <View style={theme.container.row}>
      {showSkipping ? (
        <Text style={theme.container.screenText}>skipping this word...</Text>
      ) : (
        <>
          <Button
            onPress={pressPause}
            title={pauseVoice ? "Play" : "Pause"}
            style={theme.button.settings}
          >
            <Ionicons
              name={pauseVoice ? "play-circle" : "pause-circle"}
              size={32}
            />
          </Button>
          <Button
            onPress={pressSkip}
            title={"Skip"}
            style={theme.button.settings}
          >
            <Ionicons name={"arrow-forward-circle"} size={32} />
          </Button>
          <Button
            onPress={pressRemove}
            title={"Remove"}
            style={theme.button.settings}
          >
            <Ionicons name={"close-circle"} size={32} />
          </Button>
        </>
      )}
    </View>
  );
};

export default AudioPlay;
