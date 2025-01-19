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
  IconButton
} from "react-native-paper";
import { Edit2, Trash2, FileText, FileSpreadsheet } from "lucide-react-native";
import { getData /* deleteData */ } from "../utils/storage";
import { RegistrationType } from "../types";
//import { generatePDF, generateExcel } from "../utils/fileGenerators";

const RegistrationListScreen = () => {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    RegistrationType[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<RegistrationType | null>(null);
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
    const filtered = registrations.filter(
      (reg) =>
        reg.driver.firstName.toLowerCase().includes(query.toLowerCase()) ||
        reg.driver.lastName.toLowerCase().includes(query.toLowerCase()) ||
        reg.driver?.association?.toLowerCase().includes(query.toLowerCase()) ||
        reg.vehicle.matricule.toLowerCase().includes(query.toLowerCase()) ||
        reg.vehicle.model.toLowerCase().includes(query.toLowerCase())
    );
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
    //await generatePDF(filteredRegistrations);
  };

  const handleGenerateExcel = async () => {
    //await generateExcel(filteredRegistrations);
  };

  const renderRegistrationItem = ({ item }: { item: RegistrationType }) => (
    <Card style={styles.card}>
      <Card.Content>
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
          placeholder="Search registrations"
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
            <Paragraph>
              Are you sure you want to delete this registration?
            </Paragraph>
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
  card: {
    marginBottom: 8
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconContainer: {
    flexDirection: "row"
  }
});

export default RegistrationListScreen;
