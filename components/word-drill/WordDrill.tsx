import AudioPlay from "components/audio-play/AudioPlay";
import RenderWord from "components/renderWord/RenderWord";
import Separator from "components/separator/Separator";
import { useThemeContext } from "context/ThemeContext";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { pause } from "utils/utilities";

interface WordDrillProps {
  word: IDictionary;
  onAudioComplete: VoidFunction;
  onSkipDrill: VoidFunction;
  onRemove: VoidFunction;
}

const WordDrill: React.FC<WordDrillProps> = ({
  word,
  onAudioComplete,
  onSkipDrill,
  onRemove,
}) => {
  const { theme } = useThemeContext();
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    setShowAudio(true);
  }, [word]);
  const completeAudio = () => {
    setShowAudio(false);
    onAudioComplete();
  };
  const doSkip = () => {
    const doAsyncSkip = async () => {
      setShowAudio(false);
      await pause(2);
      onSkipDrill();
    };
    doAsyncSkip();
  };
  const doRemove = () => {
    const doAsyncRemove = async () => {
      setShowAudio(false);
      onRemove();
      await pause(2);
      onAudioComplete();
    };
    doAsyncRemove();
  };
  return (
    <View>
      <RenderWord wordObject={word} />
      <Separator height={20} />
      {showAudio && (
        <AudioPlay
          word={word}
          options={{}}
          onAudioComplete={completeAudio}
          onSkipDrill={doSkip}
          onRemove={doRemove}
        />
      )}
      {!showAudio && (
        <Text style={theme.container.wordDrillValue}>Skipping...</Text>
      )}
    </View>
  );
};

export default WordDrill;
