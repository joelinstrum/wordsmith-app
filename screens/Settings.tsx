import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, ButtonBackHome, Loader, Separator, Warning } from "components";
import { useTheme } from "context/ThemeContext";
import useReloadDictionary from "hooks/useReloadDictionary";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { pause } from "utils/utilities";

const Settings: React.FC = () => {
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { reloadDictionary, loadingDictionary, removeDictionary } =
    useReloadDictionary();
  const theme = useTheme();

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

  return (
    <View style={theme.container.screen}>
      <Separator height={50} />
      <View style={theme.container.body}>
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
                <>
                  <Button
                    style={theme.button.settings}
                    title="Reload Dictionary"
                    onPress={clickResetLibrary}
                  >
                    <Ionicons name="checkmark-circle" size={32} color="gray" />
                  </Button>
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
                </>
              )}
            </>
          )}
        </>
      </View>
    </View>
  );
};

export default Settings;
