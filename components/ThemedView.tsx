import React from "react";
import { View, type ViewProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/models/theme";

type ValidBackgroundColorKeys = {
  [K in keyof ThemeColors]: ThemeColors[K] extends string ? K : never;
}[keyof ThemeColors];

export type ThemedViewProps = ViewProps & {
  backgroundColor?: ValidBackgroundColorKeys; // Only allow keys that map to strings
};

export function ThemedView({
  style,
  backgroundColor = "background",
  ...otherProps
}: ThemedViewProps) {
  const { theme } = useTheme();

  // Get the background color from the theme
  const bgColor = theme.colors[backgroundColor];

  return <View style={[{ backgroundColor: bgColor }, style]} {...otherProps} />;
}
