import Button from "components/button/Button";
import Separator from "components/separator/Separator";
import { useThemeContext as useTheme } from "context/ThemeContext";
import { Text, View } from "react-native";

interface WarningProps {
  message: string;
  onCancel?: () => void;
  onProceed?: () => void;
}

const Warning: React.FC<WarningProps> = ({ message, onCancel, onProceed }) => {
  const { theme } = useTheme();

  const pressCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const pressProceed = () => {
    if (onProceed) {
      onProceed();
    }
  };

  return (
    <View style={theme.container.warn}>
      <Text style={theme.container.screenText}>{message}</Text>
      <Separator />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          title="Cancel"
          style={{ width: 100, marginRight: 10 }}
          onPress={pressCancel}
        />
        <Button title="Proceed" style={{ width: 150 }} onPress={pressProceed} />
      </View>
    </View>
  );
};

export default Warning;
