// App.tsx
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppProvider from "context/AppProvider"; // Import the AppProvider
import React from "react";
import {
  Home,
  Settings,
  WordDrills,
  WordList,
  WordListLearned,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Drills" component={WordDrills} />
          <Stack.Screen name="WordList" component={WordList} />
          <Stack.Screen name="WordListLearned" component={WordListLearned} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
