import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as PaperProvider,
  DefaultTheme,
  //Text,
  Appbar
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./src/styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import TricycleRegistrationScreen from "./src/screens/TricycleRegistrationScreen";
import VehiculeRegistrationScreen from "./src/screens/VehicleRegistrationScreen";
import VehicleRegistrationScreen from "./src/screens/VehicleRegistrationScreen";
import RegistrationListScreen from "./src/components/RegistrationListScreen";
import RegistrationList from "./src/components/RegistrationList";
import SyncScreen from "./src/screens/SyncScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

/* export const themes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, // Important : étendez les couleurs par défaut
    primary: "#1976D2",
    accent: "#FF4081",
    success: "green", // Ajout de la couleur success
    //error: "red",
    error: "#e74c3c",
    background: "#ecf0f1" // Ajout de la couleur error
    // ... autres couleurs personnalisées
  },
  spacing: {
    //Ajout des espacements
    small: 8,
    medium: 16,
    large: 24
  }
}; */

export default function App() {
  const user = "";
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={user ? "Register" : "Login"} // Route initiale conditionnelle
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen
              name="RegistrationList"
              component={RegistrationList}
            />
            <Stack.Screen name="Sync" component={SyncScreen} />
            <Stack.Screen
              name="TricycleRegistration"
              component={TricycleRegistrationScreen}
            />
            <Stack.Screen
              name="VehicleRegistration"
              component={VehicleRegistrationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
