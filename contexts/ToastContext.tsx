import React, { createContext, useState, ReactNode } from "react";
import { Text, StyleSheet, Animated } from "react-native";

type ToastType = "success" | "error" | "info";

type ToastContextType = {
  showToast: (title:string,message: string, type?: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ title:string,message: string; type: ToastType } | null>(null);
  const opacity = useState(new Animated.Value(0))[0];

  const showToast = (title:string,message: string, type: ToastType = "info") => {
    setToast({title, message, type });

    // Animate toast appearance
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Hide toast after 3 seconds
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToast(null));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.toastContainer,
            { opacity },
            toast.type === "success" && styles.successToast,
            toast.type === "error" && styles.errorToast,
            toast.type === "info" && styles.infoToast,
          ]}
        >
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  successToast: {
    backgroundColor: "#4CAF50",
  },
  errorToast: {
    backgroundColor: "#F44336",
  },
  infoToast: {
    backgroundColor: "#2196F3",
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

