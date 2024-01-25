// AppProvider.tsx
import { DatabaseProvider } from "context/DatabaseContext";
import { ThemeProvider } from "context/ThemeContext";
import React, { ReactNode } from "react";
import { Provider as PaperProvider } from "react-native-paper";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <PaperProvider>
      <ThemeProvider>
        <DatabaseProvider>{children}</DatabaseProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default AppProvider;
