import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary"
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" ? styles.secondaryButton : styles.primaryButton
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.spacing.small
  },
  primaryButton: {
    backgroundColor: theme.colors.primary
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary
  },
  buttonText: {
    color: "white",
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold"
  }
});

export default Button;
