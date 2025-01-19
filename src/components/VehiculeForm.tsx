import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { ScrollView, View } from "react-native";
import { Button, Title } from "react-native-paper";
import Input from "./Input";
import { VehicleType } from "../types";

type VehicleFormProps = {
  onSubmit: (vehicle: VehicleType) => void;
  initialData?: Partial<VehicleType>;
  registrationType: "moto" | "tricycle" | "vehicule";
};

export type VehicleFormRef = {
  handleSubmit: () => void;
};

const VehicleForm = forwardRef<VehicleFormRef, VehicleFormProps>(
  ({ onSubmit, initialData, registrationType }, ref) => {
    const [vehicle, setVehicle] = useState<VehicleType>({
      type: registrationType,
      matricule: "",
      chassisNumber: "",
      color: "",
      model: "",
      parking: "",
      ...initialData
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof VehicleType, string>>
    >({});

    useEffect(() => {
      if (initialData) {
        setVehicle((prev) => ({ ...prev, ...initialData }));
      }
    }, [initialData]);

    const handleChange = (key: keyof VehicleType) => (value: string) => {
      setVehicle((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const validateForm = () => {
      const newErrors: Partial<Record<keyof VehicleType, string>> = {};
      let isValid = true;

      Object.entries(vehicle).forEach(([key, value]) => {
        if (key !== "matricule" && !value) {
          newErrors[key as keyof VehicleType] = "Ce champ est obligatoire.";
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      console.log("vehicle", vehicle);
      if (validateForm()) {
        console.log("vehicle", vehicle);
        onSubmit(vehicle);
      }
    };

    useImperativeHandle(ref, () => ({
      handleSubmit
    }));

    return (
      <ScrollView>
        <Title style={{ marginBottom: 16 }}>Information sur la Moto</Title>
        {/*  <Input
            label="Type"
            value={registrationType}
            onChangeText={handleChange("type")}
            error={errors.type}
          />  */}
        <Input
          label="Num Plaque"
          value={vehicle.matricule}
          onChangeText={handleChange("matricule")}
          // error={errors.matricule}
        />
        <Input
          label="Num Chassis"
          value={vehicle.chassisNumber}
          onChangeText={handleChange("chassisNumber")}
          error={errors.chassisNumber}
        />
        <Input
          label="Couleur"
          value={vehicle.color}
          onChangeText={handleChange("color")}
          error={errors.color}
        />
        <Input
          label="Marque / Model"
          value={vehicle.model}
          onChangeText={handleChange("model")}
          error={errors.model}
        />
        <Input
          label="Parking / itinéraire"
          value={vehicle.parking}
          onChangeText={handleChange("parking")}
          error={errors.parking}
        />
      </ScrollView>
    );
  }
);

export default VehicleForm;
