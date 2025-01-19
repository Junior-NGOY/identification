import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Card,
  Title,
  Paragraph,
  Searchbar,
  Dialog,
  Portal,
  IconButton,
  Button,
  Text
} from "react-native-paper";
import { Edit2, Trash2, FileText, FileSpreadsheet } from "lucide-react-native";
import { getData /* deleteData */ } from "../utils/storage";
import { RegistrationType } from "../types";
import { generateExcel } from "../utils/excelGenerators";
import { generatePDF } from "../utils/pdfGenerators";
//import { generatePDF, generateExcel } from "../utils/fileGenerators";

type VehicleType = "moto" | "tricycle" | "vehicle" | "all";

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    RegistrationType[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<RegistrationType | null>(null);
  const [vehicleTypeFilter, setVehicleTypeFilter] =
    useState<VehicleType>("all");
  const navigation = useNavigation();

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    const data = await getData("registrations");
    if (data) {
      setRegistrations(data);
      setFilteredRegistrations(data);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterRegistrations(query, vehicleTypeFilter);
  };

  const handleVehicleTypeFilter = (type: VehicleType) => {
    setVehicleTypeFilter(type);
    filterRegistrations(searchQuery, type);
  };

  const filterRegistrations = (query: string, vehicleType: VehicleType) => {
    let filtered = registrations.filter(
      (reg) =>
        reg.driver.firstName.toLowerCase().includes(query.toLowerCase()) ||
        reg.driver.lastName.toLowerCase().includes(query.toLowerCase()) ||
        reg.driver?.association?.toLowerCase().includes(query.toLowerCase()) ||
        reg.vehicle.matricule.toLowerCase().includes(query.toLowerCase()) ||
        reg.vehicle.model.toLowerCase().includes(query.toLowerCase())
    );

    if (vehicleType !== "all") {
      filtered = filtered.filter((reg) => reg.vehicle.type === vehicleType);
    }

    setFilteredRegistrations(filtered);
  };

  const handleEdit = (registration: RegistrationType) => {
    /*  navigation.navigate("EditRegistration", {
      registrationId: registration.id
    }); */
  };

  const handleDelete = (registration: RegistrationType) => {
    setSelectedRegistration(registration);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    /*  if (selectedRegistration) {
      await deleteData("registrations", selectedRegistration.id);
      setDeleteDialogVisible(false);
      loadRegistrations();
    } */
  };

  const handleGeneratePDF = async () => {
    await generatePDF(filteredRegistrations);
  };

  const handleGenerateExcel = async () => {
    await generateExcel(filteredRegistrations);
  };

  const renderRegistrationItem = ({ item }: { item: RegistrationType }) => (
    <Card style={styles.card}>
      <Card.Content style={{ marginTop: -15 }}>
        <Title>{`${item.driver.firstName} ${item.driver.lastName} -- ${item.driver.association}`}</Title>
        <Paragraph>{`Vehicle: ${item.vehicle.matricule} ${item.vehicle.model}`}</Paragraph>
        <Paragraph>{`Owner: ${item.owner.firstName} ${item.owner.lastName}`}</Paragraph>
        <View style={styles.dateContainer}>
          <Paragraph>{`Date: ${new Date(
            item.timestamp
          ).toLocaleDateString()}`}</Paragraph>
          <View style={styles.iconContainer}>
            <IconButton
              icon={() => <Edit2 size={20} color="#1976D2" />}
              onPress={() => handleEdit(item)}
            />
            <IconButton
              icon={() => <Trash2 size={20} color="#FF4081" />}
              onPress={() => handleDelete(item)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Recherche d'enregistrement"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <IconButton
          icon={() => <FileText size={24} color="#1976D2" />}
          onPress={handleGeneratePDF}
        />
        <IconButton
          icon={() => <FileSpreadsheet size={24} color="#1976D2" />}
          onPress={handleGenerateExcel}
        />
      </View>
      <View style={styles.filterButtons}>
        <Button
          mode={vehicleTypeFilter === "moto" ? "contained" : "outlined"}
          onPress={() => handleVehicleTypeFilter("moto")}
        >
          Moto
        </Button>
        <Button
          mode={vehicleTypeFilter === "tricycle" ? "contained" : "outlined"}
          onPress={() => handleVehicleTypeFilter("tricycle")}
        >
          Tricycle
        </Button>
        <Button
          mode={vehicleTypeFilter === "vehicle" ? "contained" : "outlined"}
          onPress={() => handleVehicleTypeFilter("vehicle")}
        >
          Vehicle
        </Button>
        <Button
          mode={vehicleTypeFilter === "all" ? "contained" : "outlined"}
          onPress={() => handleVehicleTypeFilter("all")}
        >
          Tous
        </Button>
      </View>
      <Text style={styles.registrationCount}>
        {filteredRegistrations.length} enregistrement(s) trouvé(s)
      </Text>
      <FlatList
        data={filteredRegistrations}
        renderItem={renderRegistrationItem}
        keyExtractor={(item) => item.id}
      />
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Voulez-vous supprimer cet enregistrement ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <IconButton
              icon={() => <Trash2 size={20} color="#FF4081" />}
              onPress={confirmDelete}
            />
            <IconButton
              icon="close"
              onPress={() => setDeleteDialogVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  searchBar: {
    flex: 1,
    marginRight: 8
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  registrationCount: {
    marginBottom: 8,
    fontWeight: "bold"
  },
  card: {
    marginBottom: 8,
    height: 110 // Increased height of the card
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: -30
  }
});

export default RegistrationList;
