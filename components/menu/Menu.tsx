import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "context/ThemeContext";
import { useState } from "react";
import { View } from "react-native";
import Button from "../button/Button";

const Menu = () => {
  const [stopWatchIcon] = useState(require("assets/images/stopwatch.png"));
  const [abcIcon] = useState(require("assets/images/abc.png"));
  const [gearsIcon] = useState(require("assets/images/gears.png"));
  const [graduationCap] = useState(require("assets/images/graduate-cap.png"));
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const onClick = (key: string) => {
    navigation.navigate(key as never);
  };

  return (
    <View
      style={{
        ...theme.container.flexCentered,
        ...{
          maxHeight: 200,
        },
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      {stopWatchIcon && (
        <Button
          title="Audio word drills"
          icon={stopWatchIcon}
          onPress={() => onClick("Drills")}
          style={theme.button.menu}
          textStyle={theme.button.primaryText}
        />
      )}
      {abcIcon && (
        <Button
          title="Your audio wordlist"
          icon={abcIcon}
          onPress={() => onClick("WordList")}
          style={theme.button.menu}
          textStyle={theme.button.primaryText}
        />
      )}
      {abcIcon && (
        <Button
          title="Words you've learned"
          icon={graduationCap}
          onPress={() => onClick("WordListLearned")}
          style={theme.button.menu}
          textStyle={theme.button.primaryText}
        />
      )}
      {gearsIcon && (
        <Button
          title="Settings"
          icon={gearsIcon}
          onPress={() => onClick("Settings")}
          style={theme.button.menu}
          textStyle={theme.button.primaryText}
        />
      )}
    </View>
  );
};

export default Menu;
