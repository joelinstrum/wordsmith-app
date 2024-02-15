import { useThemeContext } from "context/ThemeContext";
import { Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

interface CheckboxAddRemoveProps {
  isChecked: boolean;
  showCheckbox: boolean;
  onPress: VoidFunction;
  label: string;
}

const CheckboxAddremove: React.FC<CheckboxAddRemoveProps> = ({
  showCheckbox,
  isChecked,
  onPress,
  label,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      {showCheckbox && (
        <View style={theme.container.wordDrillRow}>
          <View style={theme.container.col}>
            <Text style={theme.container.wordDrillLabel}> </Text>
          </View>
          <View
            style={[
              theme.container.row,
              { justifyItems: "center", alignItems: "center", width: 200 },
            ]}
          >
            <View>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={onPress}
              />
            </View>
            <Text style={theme.container.screenText}>{label}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default CheckboxAddremove;
