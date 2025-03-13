import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/ThemedText";
import loginStyles from "./login.style";

const LoginScreen = () => {
  const { login, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(50);

  useEffect(() => {
    formOpacity.value = withTiming(1, { duration: 1000 });
    formTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;

    setEmailError(isEmailValid ? "" : "Invalid email format");
    setPasswordError(
      isPasswordValid ? "" : "Password must be at least 6 characters"
    );

    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleLogin = async () => {
    if (!isFormValid) {
      alert("Please fill in all fields correctly");
      return;
    }
    await login(email, password);
  };

  return (
    <SafeAreaView
      style={[
        loginStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={loginStyles.themeToggle}
            onPress={toggleTheme}
          >
            <Ionicons
              name={theme.dark ? "sunny-outline" : "moon-outline"}
              size={24}
              color={theme.colors.foreground}
            />
          </TouchableOpacity>

          <View style={loginStyles.logoContainer}>
            <ThemedText
              type="title"
              style={{ color: theme.colors.primary.DEFAULT }}
            >
              Koda Freight Management
            </ThemedText>
            <ThemedText
              type="subtitle"
              style={{ color: theme.colors.foreground }}
            >
              Sales Department
            </ThemedText>
          </View>

          <Animated.View
            style={[loginStyles.formContainer, formAnimatedStyle]}
            className="my-2"
          >
            <ThemedText
              type="title"
              style={{ color: theme.colors.foreground, textAlign: "center" }}
            >
              Login
            </ThemedText>

            <View style={loginStyles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.colors.foreground}
                style={loginStyles.inputIcon}
              />
              <TextInput
                style={[
                  loginStyles.input,
                  {
                    backgroundColor: theme.colors.card.DEFAULT,
                    color: theme.colors.foreground,
                  },
                ]}
                placeholder="Email"
                placeholderTextColor={theme.colors.muted.foreground}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <ThemedText style={loginStyles.errorText}>
                {String(emailError)}
              </ThemedText>
            ) : null}
            <View style={loginStyles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.colors.foreground}
                style={loginStyles.inputIcon}
              />
              <TextInput
                style={[
                  loginStyles.input,
                  {
                    backgroundColor: theme.colors.card.DEFAULT,
                    color: theme.colors.foreground,
                  },
                ]}
                placeholder="Password"
                placeholderTextColor={theme.colors.muted.foreground}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={loginStyles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={theme.colors.foreground}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <ThemedText style={loginStyles.errorText}>
                {String(passwordError)}
              </ThemedText>
            ) : null}

            <TouchableOpacity
              style={[
                loginStyles.loginButton,
                {
                  backgroundColor: isFormValid
                    ? theme.colors.primary.DEFAULT
                    : theme.colors.muted.DEFAULT,
                },
              ]}
              onPress={handleLogin}
              disabled={!isFormValid || isLoading}
            >
              <ThemedText style={loginStyles.loginButtonText}>
                <Text>{isLoading ? "Loading..." : "Login"}</Text>
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
