import React from "react";
import { Appbar } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title?: string;
};

const AppBarHeader = ({ title }: Props) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemedView>
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.background,
          elevation: 0, // Disable elevation for this header
          paddingHorizontal: 16,

          borderBottomWidth: 1,
        }}
      >
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title={title} />
        {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
        <Appbar.Action
          icon={theme.dark ? "white-balance-sunny" : "moon-waning-crescent"}
          onPress={toggleTheme}
          color={theme.colors.foreground}
        />
      </Appbar.Header>
    </ThemedView>
  );
};



export default AppBarHeader;
