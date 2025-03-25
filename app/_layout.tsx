import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "@/screens/splash-screen/SplashScreen";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppBarHeader from "@/components/ui/AppBarHeader";

ExpoSplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);


  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated loading
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await ExpoSplashScreen.hideAsync();
      }
    };

    if (loaded) {
      prepare();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
                     {appIsReady ? (
              <>
                <AppBarHeader  />
                <Slot />
                <StatusBar style="auto" />
              </>
            ) : (
              <SplashScreen
                onFinish={() => {
                  setAppIsReady(false);
                }}
              />
            )}
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
