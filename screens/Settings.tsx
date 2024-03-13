import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, ButtonBackHome, Loader, Separator, Warning } from "components";
import { useThemeContext as useTheme } from "context/ThemeContext";
import useReloadDictionary from "hooks/useReloadDictionary";
import useSpeakOptions from "hooks/useSpeakOptions";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import constants from "utils/constants";
import { getStoredItem, pause } from "utils/utilities";

const Settings: React.FC = () => {
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { numberOfDrillWords, storeNumberOfDrillWords } = useSpeakOptions();
  const [themeToUse, setThemeToUse] = useState("");
  const { reloadDictionary, loadingDictionary, removeDictionary } =
    useReloadDictionary();
  const { theme, updateTheme } = useTheme();

  const clickResetLibrary = () => {
    setIsLoading(true);
    setLoadingMessage("Resetting the dictionary");
    reloadDictionary();
  };

  const clickRemoveLibrary = () => {
    const doRemove = async () => {
      setIsLoading(true);
      setLoadingMessage("Removing Dictionary");
      await removeDictionary();
      await pause(1);
      setIsLoading(false);
    };
    doRemove();
  };

  const clickRepairDatabase = () => {
    setWarning("This will completely remove your current data");
  };

  const onProceedRepairDb = () => {
    setWarning("");
  };

  useEffect(() => {
    if (!loadingDictionary) {
      setIsLoading(false);
    }
  }, [loadingDictionary]);

  const saveNumberOfDrillItems = (n: string) => {
    storeNumberOfDrillWords(n.toString());
  };

  const saveThemeToUse = (theme: TTheme) => {
    setThemeToUse(theme);
    updateTheme(theme);
  };

  useEffect(() => {
    const getThemeFromStorage = async () => {
      const theme = (await getStoredItem("@WordSmith:theme")) || "Dark";
      setThemeToUse(theme);
    };
    getThemeFromStorage();
  }, []);

  return (
    <View style={theme.container.screen}>
      <Separator height={50} />
      <View style={theme.container.contentContainer}>
        <ButtonBackHome />
        <Text style={theme.container.screenText}>Settings & Preferences</Text>
        <Separator height={40} />
        <>
          {warning ? (
            <Warning
              message={warning}
              onCancel={() => setWarning("")}
              onProceed={onProceedRepairDb}
            />
          ) : (
            <>
              {isLoading ? (
                <Loader isLoading={isLoading} message={loadingMessage} />
              ) : (
                <View>
                  <Button
                    style={theme.button.settings}
                    title="Reload Dictionary"
                    onPress={clickResetLibrary}
                  >
                    <Ionicons name="checkmark-circle" size={32} color="gray" />
                  </Button>
                  {constants.TEST_MODE && (
                    <>
                      <Separator />
                      <Button
                        style={theme.button.settings}
                        title="Remove Dictionary"
                        onPress={clickRemoveLibrary}
                      >
                        <Ionicons name="trash" size={32} color="gray" />
                      </Button>
                      <Separator />
                      <Button
                        style={theme.button.settings}
                        title="Repair Database"
                        onPress={clickRepairDatabase}
                      >
                        <Ionicons name="construct" size={32} color="gray" />
                      </Button>
                      <Separator height={30} />
                    </>
                  )}
                  <View style={theme.container.row}>
                    <View style={theme.container.settingsColLeft}>
                      <Text style={theme.container.settingsText}>
                        Number of drill words
                      </Text>
                    </View>
                    <View style={theme.container.settingsColRight}>
                      <Text style={theme.container.settingsText}>
                        <SelectDropdown
                          data={[5, 7, 10]}
                          defaultButtonText={""}
                          dropdownStyle={{
                            width: 50,
                            margin: 0,
                            marginTop: -40,
                          }}
                          defaultValue={numberOfDrillWords}
                          buttonStyle={{ width: 50, margin: 0 }}
                          onSelect={(selectedItem, index) => {
                            saveNumberOfDrillItems(selectedItem);
                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item;
                          }}
                        />
                      </Text>
                    </View>
                  </View>
                  <View style={theme.container.row}>
                    <View style={theme.container.settingsColLeft}>
                      <Text style={theme.container.settingsText}>Theme</Text>
                    </View>
                    <View style={theme.container.settingsColRight}>
                      <Text style={theme.container.settingsText}>
                        <SelectDropdown
                          data={["Dark", "Light"]}
                          defaultButtonText={""}
                          dropdownStyle={{
                            width: 140,
                            margin: 0,
                            marginTop: -40,
                          }}
                          defaultValue={themeToUse}
                          buttonStyle={{ width: 140, margin: 0 }}
                          onSelect={(selectedItem, index) => {
                            saveThemeToUse(selectedItem);
                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item;
                          }}
                        />
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}
        </>
      </View>
    </View>
  );
};

export default Settings;
