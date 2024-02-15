import { useThemeContext } from "context/ThemeContext";
import { useState } from "react";
import { Image, View } from "react-native";

const Logo: React.FC = () => {
  const [imageUri] = useState(
    require("../../assets/images/white-logo-no-background.png")
  );

  const { theme } = useThemeContext();
  return (
    <View style={theme.container.logo}>
      {imageUri && (
        <Image
          source={imageUri}
          style={{ tintColor: theme.colors.logoColor }}
        />
      )}
    </View>
  );
};

export default Logo;
