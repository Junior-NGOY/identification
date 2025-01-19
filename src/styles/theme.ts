import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, // Important : étendez les couleurs par défaut
    primary: "#1976D2",
    accent: "#FF4081",
    success: "green", // Ajout de la couleur success
    //error: "red",
    error: "#e74c3c",
    background: "#ecf0f1", // Ajout de la couleur error
    // ... autres couleurs personnalisées
    // primary: "#3498db",
    secondary: "#2ecc71",
    // background: "#ecf0f1",
    text: "#2c3e50"
    // error: "#e74c3c",
    // success: "#27ae60"
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24
  },
  spacing: {
    //Ajout des espacements
    small: 8,
    medium: 16,
    large: 24,
    //small: 8,
    // medium: 16,
    //large: 24,
    xlarge: 32
  }
};
