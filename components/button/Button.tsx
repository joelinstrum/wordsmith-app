import { useState } from "react";
import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import getTheme from "themes/theme";

interface IButton {
  title: string;
  onPress?: (key: string) => void;
  style?: ViewStyle;
  icon?: any;
  iconPlacement?: "left" | "right" | "center";
}

const Button: React.FC<IButton> = ({
  title,
  onPress,
  style,
  icon,
  iconPlacement = "left",
}) => {
  const theme = getTheme();
  const [buttonStyle, setButtonStyle] = useState(theme.button.defaultButton);
  const click = () => {
    setButtonStyle(() => ({
      ...buttonStyle,
      ...{
        backgroundColor: "#444",
      },
      ...style,
    }));
    if (onPress) {
      onPress(title);
    }
  };
  return (
    <TouchableOpacity onPress={click}>
      <View style={{ ...buttonStyle, ...style }}>
        {icon && iconPlacement === "left" && (
          <View>
            <Image source={icon} style={theme.button.icon} />
          </View>
        )}
        <Text style={theme.button.menuText}>{title}</Text>
        {icon && iconPlacement === "right" && (
          <View>
            <Image source={icon} style={theme.button.icon} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
