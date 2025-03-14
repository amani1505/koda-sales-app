import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";

export const Header = () => {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ThemedView 
      style={{ 
        position: "absolute", // Changed from "fixed" which is not valid in React Native
        top: 0,
        right: 0,
        zIndex: 1000, // Ensure it's above other elements
        opacity: 0.8, // Make it slightly transparent
      }}
    >
      <TouchableOpacity
        style={{ 
          paddingTop: insets.top + 4, 
          paddingRight: 16,
          paddingBottom: 4,
          paddingLeft: 16,
        }}
        onPress={toggleTheme}
      >
        <Ionicons
          name={theme.dark ? "sunny-outline" : "moon-outline"}
          size={24}
          color={theme.colors.foreground}
        />
      </TouchableOpacity>
    </ThemedView>
  );
};