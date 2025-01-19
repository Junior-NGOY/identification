import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { View, Image, ScrollView } from "react-native";
import { Button, Title, HelperText, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import * as ImagePicker from "expo-image-picker";
import Input from "./Input";
import { DriverType } from "../types";
//import Dropdown from "./Dropdown";

type DriverFormProps = {
  onSubmit: (driver: DriverType) => void;
  initialData?: Partial<DriverType>;
  registrationType: "moto" | "tricycle" | "vehicule";
};

export type DriverFormRef = {
  handleSubmit: () => void;
};

const DriverForm = forwardRef<DriverFormRef, DriverFormProps>(
  ({ onSubmit, initialData, registrationType }, ref) => {
    const [driver, setDriver] = useState<DriverType>({
      photo: "",
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      addressNumber: "",
      avenue: "",
      addressQuartier: "",
      addressCommune: "",
      phoneNumber: "",
      emergencyName: "",
      emergencyContact: "",
      maritalStatus: "Célibataire",
      association: "LITEMCO",
      gender: "",
      ...initialData
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof DriverType, string>>
    >({});
    const [gender, setGender] = useState<string>();
    const [commune, setCommune] = useState<string>();
    const [etatcivil, setEtatcivil] = useState<string>();
    const [association, setAssociation] = useState<string>();

    useEffect(() => {
      if (initialData) {
        setDriver((prev) => ({ ...prev, ...initialData }));
      }
    }, [initialData]);

    const handleChange = (key: keyof DriverType) => (value: string) => {
      setDriver((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleImagePick = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.canceled) {
        setDriver((prev) => ({ ...prev, photo: result.assets[0].uri }));
        setErrors((prev) => ({ ...prev, photo: "" }));
      }
    };

    const validateForm = () => {
      const newErrors: Partial<Record<keyof DriverType, string>> = {};
      let isValid = true;

      Object.entries(driver).forEach(([key, value]) => {
        if (
          key !== "middleName" &&
          key !== "photo" &&
          key !== "dateOfBirth" &&
          key !== "addressQuartier" &&
          !value
        ) {
          newErrors[key as keyof DriverType] = "Ce champ est obligatoire.";
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      driver.addressCommune = commune;
      driver.gender = gender;
      driver.association = association;
      driver.maritalStatus = etatcivil;
      console.log("driver first", driver);
      if (validateForm()) {
        console.log("driver", driver);
        onSubmit(driver);
      }
    };

    const formatPhoneNumber = (input: string) => {
      const number = input.replace(/[^\d]/g, "").slice(0, 10);
      if (number.length <= 3) return number;
      if (number.length <= 6) return `${number.slice(0, 3)} ${number.slice(3)}`;
      return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(
        6,
        10
      )}`;
    };

    const communeList = [
      { label: "Lubumbashi", value: "Lubumbashi" },
      { label: "Kamalondo", value: "Kamalondo" },
      { label: "Kampemba", value: "Kampemba" },
      { label: "Kenya", value: "Kenya" },
      { label: "Katuba", value: "Katuba" },
      { label: "Ruashi", value: "Ruashi" }
    ];
    const maritalStatusList = [
      { label: "Marié", value: "Marié" },
      { label: "Célibataire", value: "Célibataire" },
      { label: "Divorcé", value: "Divorcé" },
      { label: "Veuf", value: "Veuf" }
    ];

    const associationList = [
      { label: "LITEMCO", value: "LITEMCO" },
      { label: "CEMCO", value: "CEMCO" },
      { label: "CEMCODEV", value: "CEMCODEV" },
      { label: "ANAMCO", value: "ANAMCO" },
      { label: "AUMCO", value: "AUMCO" },
      { label: "FENATRAD", value: "FENATRAD" }
    ];
    const associationLists = {
      moto: [
        { label: "Litemco", value: "Litemco" },
        { label: "Anamco", value: "Anamco" },
        { label: "Aumco", value: "Aumco" }
      ],
      tricycle: [
        { label: "Fenatrad", value: "Fenatrad" },
        { label: "ACTCO", value: "ACTCO" }
      ],
      vehicule: [{ label: "ACCO", value: "ACCO" }]
    };
    const genderList = [
      { label: "Masculin", value: "masculin" },
      { label: "Féminin", value: "feminin" }
    ];

    useImperativeHandle(ref, () => ({
      handleSubmit
    }));

    return (
      <ScrollView>
        <Title style={{ marginBottom: 16 }}>
          Information sur le conducteur
        </Title>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          {driver.photo ? (
            <Image
              source={{ uri: driver.photo }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                backgroundColor: "#e0e0e0",
                borderRadius: 60
              }}
            />
          )}
          <Button onPress={handleImagePick} style={{ marginTop: 8 }}>
            Selectionner une image
          </Button>
          {/*  <HelperText>Photo is optional</HelperText> */}
        </View>
        <Input
          label="Prénom"
          value={driver.firstName}
          onChangeText={handleChange("firstName")}
          error={errors.firstName}
        />
        <Input
          label="Nom"
          value={driver.lastName}
          onChangeText={handleChange("lastName")}
          error={errors.lastName}
        />
        <Input
          label="Post-nom"
          value={driver.middleName}
          onChangeText={handleChange("middleName")}
        />
        <Dropdown
          label="Sexe"
          placeholder="Select Genre"
          mode="outlined"
          options={genderList}
          value={gender}
          onSelect={setGender}
        />
        <Dropdown
          label="Etat-civil"
          placeholder="Select Marital Status"
          mode="outlined"
          options={maritalStatusList}
          value={etatcivil}
          onSelect={setEtatcivil}
        />
        <Input
          label="Date de naissance"
          value={driver.dateOfBirth}
          onChangeText={handleChange("dateOfBirth")}
          //  error={errors.dateOfBirth}
          // render={props => <TextInput {...props} mode="outlined" render={props => <TextInput {...props} type="date" />} />}
        />
        <Input
          label="N° de la maison"
          value={driver.addressNumber}
          onChangeText={handleChange("addressNumber")}
          error={errors.addressNumber}
        />
        <Input
          label="Avenue "
          value={driver.avenue}
          onChangeText={handleChange("avenue")}
          error={errors.avenue}
        />
        <Input
          label="Quartier   "
          value={driver.addressQuartier}
          onChangeText={handleChange("addressQuartier")}
          error={errors.addressQuartier}
        />
        <Dropdown
          label="Commune  "
          placeholder="Select Commune"
          mode="outlined"
          options={communeList}
          value={commune}
          onSelect={setCommune}
        />
        <TextInput
          label="Téléphone du conducteur"
          value={driver.phoneNumber}
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
        {/* <Dropdown
          label="Association"
          placeholder="Select Association"
          mode="outlined"
          options={associationList}
          value={association}
          onSelect={setAssociation}
        /> */}
        <Dropdown
          label="Association"
          placeholder="Select Association"
          mode="outlined"
          options={associationLists[registrationType]}
          value={association}
          onSelect={setAssociation}
        />

        <Input
          label="Personne d'urgence"
          value={driver.emergencyName}
          onChangeText={handleChange("emergencyName")}
          error={errors.emergencyName}
        />
        <TextInput
          label="Contact de la personne d'urgence"
          value={driver.emergencyContact}
          onChangeText={(value) =>
            handleChange("emergencyContact")(formatPhoneNumber(value))
          }
          error={!!errors.emergencyContact}
          keyboardType="phone-pad"
          mode="outlined"
          style={{ marginBottom: 16 }}
        />
        {errors.emergencyContact && (
          <HelperText type="error">{errors.emergencyContact}</HelperText>
        )}
      </ScrollView>
    );
  }
);

export default DriverForm;
