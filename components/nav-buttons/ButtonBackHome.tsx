import { useNavigation } from "@react-navigation/native";
import Separator from "components/separator/Separator";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import getTheme from "themes/theme";

const ButtonBackHome = () => {
  const theme = getTheme();
  const navigation = useNavigation();
  const [arrowImage] = useState(require("assets/images/arrow-left.png"));
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home" as never);
        }}
      >
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
