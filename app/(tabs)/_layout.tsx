import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react"; // Import useEffect
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Login from "..";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isAuthenticated = false; // Replace with your authentication logic

  // Use useEffect to handle navigation after the component mounts
  useEffect(() => {
    if (!isAuthenticated) {
      <Login />;
    }
  }, [isAuthenticated]); // Run only when isAuthenticated changes

  // If not authenticated, return null or a loading indicator
  if (!isAuthenticated) {
    return null;
  }

  // Render the tabs if authenticated
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
