import { useNavigation } from "@react-navigation/native";
import Separator from "components/separator/Separator";
import { useThemeContext } from "context/ThemeContext";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ButtonBackHomeProps {
  beforeReturn?: VoidFunction;
}

const ButtonBackHome: React.FC<ButtonBackHomeProps> = ({ beforeReturn }) => {
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const [arrowImage] = useState(require("assets/images/arrow-left.png"));

  const pressButton = async () => {
    if (beforeReturn) {
      await beforeReturn();
    }
    navigation.navigate("Home" as never);
  };
  return (
    <>
      <TouchableOpacity onPress={pressButton}>
        <View style={theme.container.centeredRow}>
          {arrowImage && <Image source={arrowImage} style={theme.button.nav} />}
          <Text style={theme.text.primaryLink}>Back To Home</Text>
        </View>
      </TouchableOpacity>
      <Separator />
    </>
  );
};

export default ButtonBackHome;
