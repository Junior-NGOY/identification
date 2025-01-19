import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Title, Button, Surface } from "react-native-paper";
import { Bike, Car, CloudUpload, List, Tractor } from "lucide-react-native";
import { RootStackParamList } from "../types";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Title style={styles.title}>Vehicle Registration App</Title>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Registration")}
            style={styles.button}
            icon={({ size, color }) => <Bike size={size} color={color} />}
          >
            Moto
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("TricycleRegistration")}
            style={styles.button}
            icon={({ size, color }) => <Tractor size={size} color={color} />}
          >
            Tricycle
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("VehicleRegistration")}
            style={styles.button}
            icon={({ size, color }) => <Car size={size} color={color} />}
          >
            Véhicule
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("RegistrationList")}
            style={styles.button}
            icon={({ size, color }) => <List size={size} color={color} />}
          >
            Voir les enregistrements
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Sync")}
            style={styles.button}
            icon={({ size, color }) => (
              <CloudUpload size={size} color={color} />
            )}
          >
            Synchroniser les données
          </Button>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0"
  },
  surface: {
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    borderRadius: 8
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center"
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    marginBottom: 16
  }
});

export default HomeScreen;
