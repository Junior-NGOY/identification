import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { RegistrationType } from "../types";

export const generateExcel = async (
  registrations: RegistrationType[]
): Promise<void> => {
  try {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = registrations.map((reg) => ({
      "Driver Name": `${reg.driver.firstName} ${reg.driver.lastName}`,
      Association: reg.driver.association,
      "Vehicle Type": reg.vehicle.type,
      "Vehicle Model": reg.vehicle.model,
      "Vehicle Matricule": reg.vehicle.matricule,
      "Owner Name": `${reg.owner.firstName} ${reg.owner.lastName}`,
      "Registration Date": new Date(reg.timestamp).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Generate Excel file content
    const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    // Define the file path
    const fileName = `Registrations_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    const filePath = `${FileSystem.documentDirectory}${fileName}`;

    // Write the file
    await FileSystem.writeAsStringAsync(filePath, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });

    // Check if sharing is available
    const isSharingAvailable = await Sharing.isAvailableAsync();

    if (isSharingAvailable) {
      // Share the file
      await Sharing.shareAsync(filePath, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Share Registrations Excel File"
      });
    } else {
      console.log("Sharing is not available");
      // You might want to implement an alternative way to save or view the file here
    }
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw error;
  }
};
