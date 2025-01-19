import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from '../config/firebase';
import Input from "../components/Input";
import Button from "../components/Button";
import { theme } from "../styles/theme";
//import { auth } from "../../firebaseConfig";
import { RootStackParamList } from "../types";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    /* try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert("'Erreur d'inscription'", error.message);
    } */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
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
      <Input
        label="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirmez votre mot de passe"
        secureTextEntry
      />
      <Button title="S'inscrire" onPress={handleRegister} />
      <Button
        title="Déjà un compte ? Se connecter"
        onPress={() => navigation.navigate("Login")}
        variant="secondary"
      />
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

export default RegisterScreen;
