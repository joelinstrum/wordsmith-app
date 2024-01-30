import Separator from "components/separator/Separator";
import { useTheme } from "context/ThemeContext";
import { ActivityIndicator, Text, View } from "react-native";

interface LoaderProps {
  isLoading?: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  isLoading = false,
  message = "loading...",
}) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <View style={theme.container.loader}>
          <Text style={theme.container.loaderText}>{message}</Text>
          <Separator height={10} />
          <ActivityIndicator size={40} color={"#3495eb"} />
        </View>
      ) : null}
    </>
  );
};

export default Loader;
