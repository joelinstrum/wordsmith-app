import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "components/button/Button";
import { useThemeContext as useTheme } from "context/ThemeContext";
import React from "react";
import { SafeAreaView, TextInput, View } from "react-native";

interface DictionarySearchProps {
  onChange: (newText: string) => void;
}

const inputTextStyle = {
  width: "80%",
  marginRight: 10,
};

const buttonStyle = {
  width: 30,
  height: 30,
};

const DictionarySearch: React.FC<DictionarySearchProps> = ({ onChange }) => {
  const [text, onChangeText] = React.useState("");
  const { theme } = useTheme();

  const onTextChange = (newText: string) => {
    onChangeText(newText.toLowerCase());
    onChange(newText);
  };

  const onClear = () => {
    onChangeText("");
    onChange("");
  };

  return (
    <SafeAreaView style={{ display: "flex", flexDirection: "row" }}>
      <TextInput
        style={[theme.inputText, inputTextStyle]}
        onChangeText={onTextChange}
        value={text}
        placeholder="Search"
        placeholderTextColor={theme.colors.inputPlaceholder}
      />
      <View>
        <Button onPress={onClear} style={buttonStyle}>
          <Ionicons name="close-circle" size={20} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default DictionarySearch;
