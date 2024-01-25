import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import getTheme from "themes/theme";
import Button from "../button/Button";

const Menu = () => {
  const [stopWatchIcon] = useState(require("assets/images/stopwatch.png"));
  const [abcIcon] = useState(require("assets/images/abc.png"));
  const [gearsIcon] = useState(require("assets/images/gears.png"));
  const theme = getTheme();

  // Access the navigation object
  const navigation = useNavigation();

  const onClick = (key: string) => {
    console.log("YOu clicked on ", key);
    // Use the navigation object to navigate to the specified screen
    navigation.navigate(key as never);
  };

  return (
    <View
      style={{
        ...theme.container.flexCentered,
        ...{
          maxHeight: 200,
        },
      }}
    >
      {stopWatchIcon && (
        <Button
          title="Audio word drills"
          icon={stopWatchIcon}
          onPress={() => onClick("Drills")}
          style={theme.button.menu}
        />
      )}
      {abcIcon && (
        <Button
          title="Your audio wordlist"
          icon={abcIcon}
          onPress={() => onClick("WordList")}
          style={theme.button.menu}
        />
      )}
      {gearsIcon && (
        <Button
          title="Settings"
          icon={gearsIcon}
          onPress={() => onClick("Settings")}
          style={theme.button.menu}
        />
      )}
    </View>
  );
};

export default Menu;
