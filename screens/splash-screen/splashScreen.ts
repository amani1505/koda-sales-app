import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  content: {
    alignItems: "center",
    textAlign: "center",
  },
  logoContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#4F46E5", // Primary Color
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#10B981", // Secondary Color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 14,
    color: "#6B7280",
  },
});

export default styles;
