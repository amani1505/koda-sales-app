import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  Animated,
} from "react-native";
import { FAB, IconButton, Button } from "react-native-paper";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import SearchAreaStyle from "@/styles/search-area";

const CategoriesScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [categories] = useState([
    {
      id: "1",
      title: "Individual",
      description: "Individual customers",
      isActive: true,
    },
    {
      id: "2",
      title: "Small Business",
      description: "Small to medium businesses",
      isActive: true,
    },
    {
      id: "3",
      title: "Corporate",
      description: "Large corporate customers",
      isActive: true,
    },
  ]);

  // Animation setup
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

  const renderItem = ({ item }: { item: any }) => (
    <ThemedView style={styles.categoryItem}>
      <View style={styles.categoryInfo}>
        <ThemedText
          type="subtitle"
          style={[styles.categoryTitle, { color: "#C6A700" }]}
        >
          {item.title}
        </ThemedText>
        <Text
          style={[
            styles.categoryDescription,
            { color: theme.colors.foreground },
          ]}
        >
          {item.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <IconButton
          icon="circle-edit-outline"
          iconColor="#00a6f4"
          size={22}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="trash-can-outline"
          iconColor="#fb2c36"
          size={22}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </ThemedView>
  );

  return (
    <ThemedView
      style={[SearchAreaStyle.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.dark ? "light" : "dark"} />

      {/* SafeAreaView with proper insets handling */}
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
        {/* Additional top padding to ensure content is below status bar */}
        <ThemedView
          style={{ height: Platform.OS === "android" ? insets.top || 30 : 0 }}
        />

        {/* Search bar and refresh button container */}
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
              style={[SearchAreaStyle.input, { color: theme.colors.foreground }]}
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

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({


  list: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },

  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#373737",
    marginBottom: 8,
    borderRadius: 5,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButton: {
    marginLeft: 4,
  },

});

export default CategoriesScreen;
