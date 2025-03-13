import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK_USER } from "@/mock/MOCK_USER";
import { AuthContextType } from "@/models/AuthContextType";
import { User } from "@/models/User";
import { useToast } from "@/hooks/useToast";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear any invalid data
        await AsyncStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Mock login - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo credentials for testing
      if (email === "demo@kodafreight.com" && password === "password") {
        setUser(MOCK_USER);
        await AsyncStorage.setItem("user", JSON.stringify(MOCK_USER));

        showToast(`Welcome back, ${MOCK_USER.name}!`, "success");

        return true;
      }

      showToast("Invalid credentials. Try using demo@kodafreight.com / password", "error");

      return false;
    } catch (error) {
      console.error("Login error:", error);

      showToast("An unexpected error occurred. Please try again.", "error");

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);

      showToast("You have been successfully logged out.", "info");
    } catch (error) {
      console.error("Logout error:", error);
      showToast("An error occurred while logging out.", "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};