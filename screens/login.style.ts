import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  themeToggle: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  inputIcon: {
    position: "absolute",
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 45,
    borderRadius: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default loginStyles;
