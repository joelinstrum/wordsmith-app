import { useThemeContext } from "context/ThemeContext";
import { View } from "react-native";

const ScreenContainer: React.FC<IScreenContainer> = ({ children }) => {
  const { theme } = useThemeContext();

  return <View style={theme.container.screen}>{children}</View>;
};

export default ScreenContainer;
