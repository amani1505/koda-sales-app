import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "@/screens/splash-screen/SplashScreen";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (loaded) {
      ExpoSplashScreen.hideAsync();
      setTimeout(() => {
        setShowSplash(false); // Hide the splash screen after 2 seconds
      }, 2000);
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        {showSplash ? (
          <SplashScreen
            onFinish={() => {
              setShowSplash(false); // Hide the splash screen
            }}
          />
        ) : (
          <>
            <Slot /> {/* Use Slot instead of Stack */}
            <StatusBar style="auto" />
          </>
        )}
      </ToastProvider>
    </ThemeProvider>
  );
}
