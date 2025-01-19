import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
//import { signInWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../config/firebase";
//import Input from "../components/Input";
//import Button from "../components/Button";
import { theme } from "../styles/theme";
//import { auth } from "../../firebaseConfig";
import { RootStackParamList } from "../types";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    navigation.navigate("Home");
    /*  try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Erreur de connexion", error.message);
    } */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Entrez votre email"
      />
      <Input
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        placeholder="Entrez votre mot de passe"
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      {/*   <Button
        title="S'inscrire"
        onPress={() => navigation.navigate("Home")}
        variant="secondary"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.large,
    textAlign: "center"
  }
});

export default LoginScreen;
