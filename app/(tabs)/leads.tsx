import React, { useRef, useState } from "react";
import { Animated, Platform, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import SearchAreaStyle from "@/styles/search-area";
import { Ionicons } from "@expo/vector-icons";
import { Button, FAB } from "react-native-paper";

const Leads = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    // If already refreshing, ignore additional clicks
    if (isRefreshing) return;

    setIsRefreshing(true);

    // Rotation animation
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500, // Half a second rotation
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0, // Reset immediately
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsRefreshing(false);
      // Here you can add actual refresh logic
      console.log("Refresh completed");
    });
  };

  // Interpolate rotation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ThemedView
      style={[
        SearchAreaStyle.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
        <ThemedView
          style={{ height: Platform.OS === "android" ? insets.top || 30 : 0 }}
        />
        <ThemedView>
          <ThemedView style={SearchAreaStyle.searchRow}>
            <ThemedView
              style={[
                SearchAreaStyle.inputContainer,
                {
                  borderColor: theme.colors.foreground,
                },
              ]}
            >
              <Ionicons
                name="search"
                size={18}
                color={theme.colors.foreground}
                style={SearchAreaStyle.inputIcon}
              />
              <TextInput
                style={[
                  SearchAreaStyle.input,
                  { color: theme.colors.foreground },
                ]}
                placeholder="Search categories..."
                placeholderTextColor={theme.dark ? "#6B6B6B" : "#8A8A8A"}
              />
            </ThemedView>

            <View style={SearchAreaStyle.actionButtons}>
              <Animated.View
                style={{
                  transform: [{ rotate: rotation }],
                  opacity: isRefreshing ? 0.7 : 1,
                }}
              >
                <FAB
                  icon="sync"
                  size="small"
                  color={theme.colors.foreground}
                  onPress={handleRefresh}
                  mode="flat"
                  style={[
                    SearchAreaStyle.refreshFab,
                    {
                      backgroundColor: theme.colors.background,
                    },
                  ]}
                  theme={{
                    colors: {
                      primary: theme.colors.primary.DEFAULT,
                      secondary: theme.colors.secondary.DEFAULT,
                    },
                  }}
                  animated={true}
                />
              </Animated.View>

              <Button
                icon="plus"
                mode="contained"
                onPress={() => console.log("New Category")}
                style={[
                  SearchAreaStyle.newButton,
                  { backgroundColor: theme.colors.primary.DEFAULT },
                ]}
              >
                NEW
              </Button>
            </View>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Leads;
