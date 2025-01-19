import React from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        mode="outlined"
        error={!!error}
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

export default Input;
