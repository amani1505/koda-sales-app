import { createContext, useState } from "react";
import { Theme, ThemeContextType } from "@/models/theme";
import { lightTheme } from "@/data/lightTheme";
import { darkTheme } from "@/data/darkTheme";


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme.dark ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};