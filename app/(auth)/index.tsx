import { AuthProvider } from "@/contexts/AuthContext";
import LoginScreen from "@/screens/LoginScreen";

function Index() {
  return (
    <AuthProvider>
      {/* <StatusBar style="dark" /> */}

      <LoginScreen />
    </AuthProvider>
  );
}

export default Index;
