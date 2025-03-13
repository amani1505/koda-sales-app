import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MotiText, MotiView } from "moti";
import styles from "./splashScreen";
import { useTheme } from "@/hooks/useTheme";

interface SplashScreenProps {
  onFinish: () => void; // Define the type for onFinish
}

function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isPressed, setIsPressed] = useState(false); // State to handle tap effect
  const { theme } = useTheme();

  const handleStart = () => {
    if (onFinish) onFinish(); // Call the onFinish callback
  };

  return (
    <ThemedView style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200, duration: 500 }}
        style={styles.content}
      >
        <MotiView
          style={styles.logoContainer}
          from={{ scale: 1, rotate: "0deg" }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: ["0deg", "10deg", "-10deg", "0deg"],
          }}
          transition={{ duration: 2000, loop: true }}
        >
          <ThemedText style={styles.logoText}>K</ThemedText>
        </MotiView>

        <MotiText
          style={styles.title}
          from={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2000, loop: true }}
        >
          <ThemedText
            type="title"
            style={{ color: theme.colors.primary.DEFAULT }}
          >
            Koda Freight
          </ThemedText>
        </MotiText>

        <MotiText
          style={styles.subtitle}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 500 }}
        >
          Sales CRM for Freight Management
        </MotiText>

        {/* <MotiView
          from={{ scale: 1 }}
          animate={{ scale: isPressed ? 0.95 : 1 }} // Handle tap effect
          transition={{ type: "timing", duration: 100 }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleStart} // Use handleStart for navigation
            onPressIn={() => setIsPressed(true)} // Handle press in
            onPressOut={() => setIsPressed(false)} // Handle press out
          >
            <ThemedText style={styles.buttonText}>Get Started</ThemedText>
          </TouchableOpacity>
        </MotiView> */}
      </MotiView>

      <MotiText
        style={styles.footer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1000 }}
      >
    <ThemedText type="subtitle" style={{ color: theme.colors.foreground }}>
        © {new Date().getFullYear()} Koda Freight Management{" "}
            </ThemedText>


        {/* Dynamic year */}
      </MotiText>
    </ThemedView>
  );
}

export default SplashScreen;
