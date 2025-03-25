import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Dashboard = () => {
  const { theme } = useTheme();
  // Sample data
  const stats = [
    { id: 1, title: "Total Leads", count: 2, icon: "people", color: "#4CAF50" },
    { id: 2, title: "Categories", count: 3, icon: "folder", color: "#FF9800" },
    { id: 3, title: "Messages Sent", count: 3, icon: "mail", color: "#2196F3" },
    {
      id: 4,
      title: "Failed Messages",
      count: 1,
      icon: "alert-circle",
      color: "#F44336",
    },
  ];

  const recentLeads = [
    { id: 1, name: "Jane Smith", type: "Individual" },
    { id: 2, name: "John Doe", type: "Corporate" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.dark ? "light" : "dark"} />
 
      <ThemedView style={styles.header}>
        <ThemedView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ThemedText
              style={{ color: theme.colors.primary.DEFAULT }}
              type="title"
            >
              Welcome back!
            </ThemedText>
            <HelloWave />
          </View>

          <ThemedText style={{ color: theme.colors.foreground }}>
            Welcome to your sales dashboard
          </ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.refreshButton}>
          <EvilIcons name="refresh" size={24} color="#fff" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.content}>
        {/* Overview Section */}
        <ThemedText
          style={{
            color: theme.colors.foreground,
            marginBottom: 16,
            marginTop: 8,
          }}
          type="subtitle"
        >
          Overview
        </ThemedText>
        <ThemedView style={styles.statsContainer}>
          {stats.map((item) => (
            <ThemedView
              key={item.id}
              style={{
                borderLeftColor: item.color,
                width: "48%",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderLeftWidth: 4,
                backgroundColor: theme.dark ? "#222" : "#fff", // Lighten background in dark mode
                shadowColor: theme.dark ? "#fff" : "#000", // Adjust shadow color
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: theme.dark ? 0.3 : 0.2, // Slightly increase opacity in dark mode
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              <View style={styles.statContent}>
                <ThemedText style={styles.statCount}>{item.count}</ThemedText>
                <ThemedText style={styles.statTitle}>{item.title}</ThemedText>
              </View>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Recent Leads Section */}
        <View style={styles.sectionHeader}>
          <ThemedText
            style={{
              color: theme.colors.foreground,
              marginBottom: 16,
              marginTop: 8,
            }}
            type="subtitle"
          >
            Recent Leads
          </ThemedText>
          <TouchableOpacity>
            <ThemedText type="link">View All</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedView style={styles.leadsContainer}>
          {recentLeads.map((lead) => (
            <ThemedView
              key={lead.id}
              style={{
                backgroundColor: theme.dark ? "#222" : "#fff", // Lighten background in dark mode
                shadowColor: theme.dark ? "#fff" : "#000", // Adjust shadow color
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: theme.dark ? 0.3 : 0.2, // Slightly increase opacity in dark mode
                shadowRadius: 2,
                elevation: 1,

                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <ThemedText
                  style={{
                    color: theme.colors.foreground,
                  }}
                  type="subtitle"
                >
                  {lead.name}
                </ThemedText>
                <Text style={styles.leadType}>{lead.type}</Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-add" size={22} color="#fff" />
            <Text style={styles.actionText}>New Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="folder-open" size={22} color="#fff" />
            <Text style={styles.actionText}>New Category</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#8e8e8e",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d2d2d",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  refreshText: {
    marginLeft: 6,
    color: "#ffffff",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  viewAllText: {
    color: "#8e8e8e",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statCard: {},

  statContent: {
    flex: 1,
  },
  statCount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  leadsContainer: {
    marginBottom: 16,
  },
  leadCard: {},
  leadName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  leadType: {
    fontSize: 14,
    color: "#8e8e8e",
  },
  viewButton: {
    backgroundColor: "#2d2d2d",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#ffffff",
    fontSize: 14,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    width: "48%",
    justifyContent: "center",
  },
  actionText: {
    color: "#ffffff",
    marginLeft: 8,
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#2d2d2d",
    paddingVertical: 12,
    backgroundColor: "#1a1a1a",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#8e8e8e",
    marginTop: 4,
  },
  activeNavText: {
    color: "#ffffff",
  },
});

export default Dashboard;
