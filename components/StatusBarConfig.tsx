import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";

export const StatusBarConfig = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      style={"dark"}
      backgroundColor={
        theme.dark ? theme.colors.background : theme.colors.primary.DEFAULT
      }
    />
  );
};
