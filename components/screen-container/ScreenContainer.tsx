import { View } from "react-native";
import getTheme from "themes/theme";

const ScreenContainer: React.FC<IScreenContainer> = ({ children }) => {
  const theme = getTheme();

  return <View style={theme.container.screen}>{children}</View>;
};

export default ScreenContainer;
