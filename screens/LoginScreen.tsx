import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
    KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import loginStyles from "./login.style";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";



export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const { theme } = useTheme();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;

  // Run animations on component mount
  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  }, );

  // Button press animation
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    handleSubmit();
  };

  // Logo rotation interpolation
  const spin = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const handleSubmit = async () => {
    await login(email, password);
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView
      style={[
        loginStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Dynamic status bar that adapts to theme */}
      <StatusBar style={theme.dark ? "light" : "dark"} />

      {/* Using KeyboardAvoidingView instead of KeyboardAwareScrollView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={loginStyles.scrollContainer}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.logoCircle,
                { transform: [{ rotate: spin }] },
                { backgroundColor: theme.colors.primary.DEFAULT },
              ]}
            >
              <Text style={styles.logoText}>K</Text>
            </Animated.View>
            <ThemedText style={styles.welcomeText}>Welcome back</ThemedText>
            <Text
              style={[
                styles.subtitleText,
                { color: theme.dark ? "#6B6B6B" : "#8A8A8A" },
              ]}
            >
              Login to access your Koda Lead Haven dashboard
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <Animated.View
              style={[
                styles.inputContainer,
                {
                  transform: [{ translateX: slideAnim }],
                  opacity: fadeAnim,
                  borderColor: theme.dark ? "#333" : "#DDD",
                },
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={22}
                color={theme.dark ? "#6B6B6B" : "#8A8A8A"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.colors.foreground }]}
                placeholder="your.email@example.com"
                placeholderTextColor={theme.dark ? "#6B6B6B" : "#8A8A8A"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animated.View>

            <ThemedText style={styles.inputLabel}>Password</ThemedText>
            <Animated.View
              style={[
                styles.inputContainer,
                {
                  transform: [{ translateX: slideAnim }],
                  opacity: fadeAnim,
                  borderColor: theme.dark ? "#333" : "#DDD",
                },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={theme.dark ? "#6B6B6B" : "#8A8A8A"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.colors.foreground }]}
                placeholder="••••••••"
                placeholderTextColor={theme.dark ? "#6B6B6B" : "#8A8A8A"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color={theme.dark ? "#6B6B6B" : "#8A8A8A"}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  { backgroundColor: theme.colors.primary.DEFAULT },
                ]}
                onPress={animateButton}
                activeOpacity={0.8}
              >
                <Text style={styles.signInText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </TouchableOpacity>
            </Animated.View>

            <Animated.Text
              style={[
                styles.demoText,
                {
                  opacity: fadeAnim,
                  color: theme.dark ? "#6B6B6B" : "#8A8A8A",
                },
              ]}
            >
              Demo credentials: demo@kodahaven.com / password
            </Animated.Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5D00FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#5D00FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    height: 50,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  signInButton: {
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signInText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  demoText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});
