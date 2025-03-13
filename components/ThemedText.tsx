import React from "react";
import { Text, type TextProps, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  children,
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme();

  // Define text styles based on the type
  const textStyles = [
    { color: theme.colors.foreground }, // Default text color from the theme
    type === "default" && styles.default,
    type === "title" && styles.title,
    type === "defaultSemiBold" && styles.defaultSemiBold,
    type === "subtitle" && styles.subtitle,
    type === "link" && { ...styles.link, color: theme.colors.primary.DEFAULT }, // Link color from the theme
    style, // Custom styles passed as props
  ];

  return (
    <Text style={textStyles} {...rest}>
      {typeof children === "string" ? children : String(children)}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
