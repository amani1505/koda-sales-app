import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        router.replace("/(tabs)"); // Redirect to Home (Tabs)
      } else {
        router.replace("/(auth)"); // Redirect to Login
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <ThemedView className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return null;
}
