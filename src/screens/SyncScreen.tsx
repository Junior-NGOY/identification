import React, { useState } from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";
import { syncData } from "../utils/storage";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../types";

const SyncScreen = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSync = async () => {
    navigation.navigate("Login");
    setIsSyncing(true);
    setSyncStatus(null);

    const success = await syncData();

    setIsSyncing(false);
    setSyncStatus(success ? "Sync successful" : "Sync failed");
  };

  return (
    <View /* className="flex-1 justify-center items-center p-4" */>
      <Button
        title={isSyncing ? "Syncing..." : "Sync Data"}
        onPress={handleSync}
      />
      {syncStatus && <Text /* className="mt-4 text-lg" */>{syncStatus}</Text>}
    </View>
  );
};

export default SyncScreen;
