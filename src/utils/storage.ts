import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing data:", e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving data:", e);
  }
};

export const syncData = async () => {
  try {
    const drivers = await getData("drivers");
    const vehicles = await getData("vehicles");
    const parkings = await getData("parkings");

    // Here you would typically send this data to your server
    // For now, we'll just log it
    console.log("Data to sync:", { drivers, vehicles, parkings });

    // After successful sync, you might want to clear the local storage
    // await AsyncStorage.clear();

    return true;
  } catch (e) {
    console.error("Error syncing data:", e);
    return false;
  }
};
