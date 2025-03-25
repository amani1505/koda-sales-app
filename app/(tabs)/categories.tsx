import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";

const CategoriesScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [categories, setCategories] = useState([
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
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color="#00a6f4" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Ionicons name="trash-outline" size={20} color="#fb2c36" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.dark ? "light" : "dark"} />

      {/* SafeAreaView with proper insets handling */}
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
        {/* Additional top padding to ensure content is below status bar */}
        <ThemedView
          style={{ height: Platform.OS === "android" ? insets.top || 30 : 0 }}
        />
       

        {/* Search bar and refresh button container */}
        <ThemedView style={styles.searchRow}>
          <ThemedView
            style={[
              styles.inputContainer,
              {
                borderColor: theme.dark ? "#333" : "#DDD",
              },
            ]}
          >
            <Ionicons
              name="search"
              size={18}
              color={theme.dark ? "#6B6B6B" : "#8A8A8A"}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground }]}
              placeholder="Search categories..."
              placeholderTextColor={theme.dark ? "#6B6B6B" : "#8A8A8A"}
            />
          </ThemedView>

          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons
              name="refresh-outline"
              size={22}
              color={theme.colors.foreground}
            />
          </TouchableOpacity>
        </ThemedView>

        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              styles.newButton,
              { backgroundColor: theme.colors.primary.DEFAULT },
            ]}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.newButtonText}>New</Text>
          </TouchableOpacity>
        </View>

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
  container: {
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    flex: 1,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 14,
  },
  refreshButton: {
    padding: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  newButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  newButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontWeight: "500",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
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
