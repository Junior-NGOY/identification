import React, { useRef, useEffect, useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import {
  Title,
  ProgressBar,
  Button,
  Snackbar,
  List,
  IconButton
} from "react-native-paper";
import DriverForm, { DriverFormRef } from "../components/DriverForm";
import VehicleForm, { VehicleFormRef } from "../components/VehiculeForm";
import OwnerForm, { OwnerFormRef } from "../components/OwnerForm";
import { DriverType, VehicleType, OwnerType, RegistrationType } from "../types";
import { storeData, getData /* removeData */ } from "../utils/storage";
import {
  deleteFromFirebase,
  getFromFirebase,
  saveToFirebase
} from "../utils/firebase";

/* import {
  saveToFirebase,
  deleteFromFirebase,
  getFromFirebase
} from "../utils/firebase"; */

const TricycleRegistrationScreen = () => {
  const [step, setStep] = useState(0);
  const [driverData, setDriverData] = useState<DriverType>({} as DriverType);
  const [vehicleData, setVehicleData] = useState<VehicleType>(
    {} as VehicleType
  );
  const [ownerData, setOwnerData] = useState<OwnerType>({} as OwnerType);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const driverFormRef = useRef<DriverFormRef>(null);
  const vehicleFormRef = useRef<VehicleFormRef>(null);
  const ownerFormRef = useRef<OwnerFormRef>(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    const localRegistrations = (await getData("registrations")) || [];
    const firebaseRegistrations = await getFromFirebase();
    const allRegistrations = [...localRegistrations, ...firebaseRegistrations];
    setRegistrations(allRegistrations);
  };

  const handleDriverSubmit = (driver: DriverType) => {
    setDriverData(driver);
    setStep(1);
  };

  const handleVehicleSubmit = (vehicle: VehicleType) => {
    setVehicleData(vehicle);
    setStep(2);
  };

  const handleOwnerSubmit = async (owner: OwnerType) => {
    setOwnerData(owner);
    const completeRegistration: RegistrationType = {
      id: editingId || Date.now().toString(),
      driver: driverData,
      vehicle: vehicleData,
      owner: owner,
      timestamp: Date.now()
    };

    try {
      if (editingId) {
        await updateRegistration(completeRegistration);
      } else {
        await saveRegistration(completeRegistration);
      }

      console.log(
        "Registration completed:",
        JSON.stringify(completeRegistration, null, 2)
      );
      setSnackbarMessage("Information enregistrée avec succès");
      setSnackbarVisible(true);
      resetForms();
      setEditingId(null);
      loadRegistrations();
    } catch (error) {
      console.error("Error saving registration:", error);
      setSnackbarMessage("Erreur de sauvegarde");
      setSnackbarVisible(true);
    }
  };

  const saveRegistration = async (registration: RegistrationType) => {
    await storeData("registrations", [...registrations, registration]);
    await saveToFirebase(registration);
  };

  const updateRegistration = async (registration: RegistrationType) => {
    const updatedRegistrations = registrations.map((reg) =>
      reg.id === registration.id ? registration : reg
    );
    await storeData("registrations", updatedRegistrations);
    await saveToFirebase(registration);
  };

  const deleteRegistration = async (id: string) => {
    const updatedRegistrations = registrations.filter((reg) => reg.id !== id);
    await storeData("registrations", updatedRegistrations);
    await deleteFromFirebase(id);
    loadRegistrations();
    setSnackbarMessage("Registration deleted successfully");
    setSnackbarVisible(true);
  };

  const editRegistration = (registration: RegistrationType) => {
    setDriverData(registration.driver);
    setVehicleData(registration.vehicle);
    setOwnerData(registration.owner);
    setEditingId(registration.id);
    setStep(0);
  };

  const resetForms = () => {
    setDriverData({} as DriverType);
    setVehicleData({} as VehicleType);
    setOwnerData({} as OwnerType);
    setStep(0);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <DriverForm
            ref={driverFormRef}
            onSubmit={handleDriverSubmit}
            initialData={driverData}
            registrationType="tricycle"
          />
        );
      case 1:
        return (
          <VehicleForm
            ref={vehicleFormRef}
            onSubmit={handleVehicleSubmit}
            initialData={vehicleData}
            registrationType="tricycle"
          />
        );
      case 2:
        return (
          <OwnerForm
            ref={ownerFormRef}
            onSubmit={handleOwnerSubmit}
            initialData={ownerData}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        driverFormRef.current?.handleSubmit();
        break;
      case 1:
        vehicleFormRef.current?.handleSubmit();
        break;
      case 2:
        ownerFormRef.current?.handleSubmit();
        break;
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const renderButtons = () => {
    switch (step) {
      case 0:
        return (
          <Button mode="contained" onPress={handleNext}>
            Next
          </Button>
        );
      case 1:
        return (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button mode="outlined" onPress={handlePrevious}>
              Previous
            </Button>
            <Button mode="contained" onPress={handleNext}>
              Next
            </Button>
          </View>
        );
      case 2:
        return (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button mode="outlined" onPress={handlePrevious}>
              Previous
            </Button>
            <Button mode="contained" onPress={handleNext}>
              {editingId ? "Update" : "Submit"}
            </Button>
          </View>
        );
      default:
        return null;
    }
  };

  const renderItem = ({ item }: { item: RegistrationType }) => (
    <List.Item
      title={`${item.driver.firstName} ${item.driver.lastName}`}
      description={`Vehicle: ${item.vehicle.matricule} ${item.vehicle.model}`}
      right={(props) => (
        <View style={{ flexDirection: "row" }}>
          <IconButton icon="pencil" onPress={() => editRegistration(item)} />
          <IconButton
            icon="delete"
            onPress={() => deleteRegistration(item.id)}
          />
        </View>
      )}
    />
  );

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Title style={{ marginBottom: 16 }}>Registration</Title>
      <ProgressBar progress={(step + 1) / 3} style={{ marginBottom: 16 }} />
      {renderStep()}
      <View style={{ marginTop: 16, marginBottom: 32 }}>{renderButtons()}</View>
      {/*    <Title style={{ marginBottom: 16 }}>Registered Vehicles</Title>
      <FlatList
        data={registrations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => setSnackbarVisible(false)
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

export default TricycleRegistrationScreen;
