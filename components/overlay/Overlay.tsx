import { useTheme } from "context/ThemeContext";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface OverlayProps {
  children?: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <View style={theme.container.modal}>
      <Text style={{ color: "white", fontSize: 24 }}>
        Here is the modal window
      </Text>
    </View>
  );
};

export default Overlay;
