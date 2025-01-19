import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { ScrollView } from "react-native";
import { HelperText, TextInput, Title } from "react-native-paper";
import Input from "./Input";
import { OwnerType } from "../types";

type OwnerFormProps = {
  onSubmit: (owner: OwnerType) => void;
  initialData?: Partial<OwnerType>;
};

export type OwnerFormRef = {
  handleSubmit: () => void;
};

const formatPhoneNumber = (input: string) => {
  const number = input.replace(/[^\d]/g, "").slice(0, 10);
  if (number.length <= 3) return number;
  if (number.length <= 6) return `${number.slice(0, 3)} ${number.slice(3)}`;
  return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 10)}`;
};

const OwnerForm = forwardRef<OwnerFormRef, OwnerFormProps>(
  ({ onSubmit, initialData }, ref) => {
    const [owner, setOwner] = useState<OwnerType>({
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      ...initialData
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof OwnerType, string>>
    >({});

    useEffect(() => {
      if (initialData) {
        setOwner((prev) => ({ ...prev, ...initialData }));
      }
    }, [initialData]);

    const handleChange = (key: keyof OwnerType) => (value: string) => {
      setOwner((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const validateForm = () => {
      const newErrors: Partial<Record<keyof OwnerType, string>> = {};
      let isValid = true;

      Object.entries(owner).forEach(([key, value]) => {
        if (!value) {
          newErrors[key as keyof OwnerType] = "Ce champ est obligatoire.";
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        console.log("owner", owner);
        onSubmit(owner);
      }
    };

    useImperativeHandle(ref, () => ({
      handleSubmit
    }));

    return (
      <ScrollView>
        <Title style={{ marginBottom: 16 }}>
          Information sur le propriétaire
        </Title>
        <Input
          label="Prénom"
          value={owner.firstName}
          onChangeText={handleChange("firstName")}
          error={errors.firstName}
        />
        <Input
          label="Nom"
          value={owner.lastName}
          onChangeText={handleChange("lastName")}
          error={errors.lastName}
        />
        <Input
          label="Adresse du propriétaire"
          value={owner.address}
          onChangeText={handleChange("address")}
          error={errors.address}
        />
        {/* <Input
          label="Num. Téléphone"
          value={owner.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          error={errors.phoneNumber}
        /> */}
        <TextInput
          label="Téléphone du propriétaire"
          value={owner.phoneNumber}
          onChangeText={(value) =>
            handleChange("phoneNumber")(formatPhoneNumber(value))
          }
          error={!!errors.phoneNumber}
          keyboardType="phone-pad"
          mode="outlined"
          style={{ marginBottom: 16 }}
        />
        {errors.phoneNumber && (
          <HelperText type="error">{errors.phoneNumber}</HelperText>
        )}
      </ScrollView>
    );
  }
);

export default OwnerForm;
