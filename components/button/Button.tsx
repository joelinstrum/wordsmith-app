import { ReactNode, useState } from "react";
import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import getTheme from "themes/theme";
import { pause } from "utils/utilities";

interface IButton {
  title?: string;
  onPress?: (key: string) => void;
  style?: ViewStyle;
  icon?: any;
  iconPlacement?: "left" | "right" | "center";
  children?: ReactNode;
}

const Button: React.FC<IButton> = ({
  title,
  onPress,
  style,
  icon,
  iconPlacement = "left",
  children,
}) => {
  const theme = getTheme();
  const [buttonStyle, setButtonStyle] = useState(theme.button.defaultButton);
  const click = () => {
    const doClick = async () => {
      setButtonStyle(theme.button.defaultButtonPressed);
      await pause(0.25);
      setButtonStyle(theme.button.defaultButton);
      if (onPress) {
        onPress(title || "");
      }
    };
    doClick();
  };
  return (
    <TouchableOpacity onPress={click}>
      <View style={{ ...buttonStyle, ...style }}>
        {icon && iconPlacement === "left" && (
          <View>
            <Image source={icon} style={theme.button.icon} />
          </View>
        )}
        <Text style={[theme.button.menuText, { marginRight: 10 }]}>
          {title}
        </Text>
        {icon && iconPlacement === "right" && (
          <View>
            <Image source={icon} style={theme.button.icon} />
          </View>
        )}
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
