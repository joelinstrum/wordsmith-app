import { useState } from "react";
import { Image, View } from "react-native";
import { containerStyles } from "../../styles";

const Logo: React.FC = () => {
  const [imageUri] = useState(
    require("../../assets/images/white-logo-no-background.png")
  );

  return (
    <View style={containerStyles.logo}>
      {imageUri && <Image source={imageUri} />}
    </View>
  );
};

export default Logo;
