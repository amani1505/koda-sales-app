// export type ThemeColors = {
//     border: string;
//     input: string;
//     ring: string;
//     background: string;
//     foreground: string;
//     primary: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     secondary: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     destructive: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     muted: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     accent: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     popover: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     card: {
//       DEFAULT: string;
//       foreground: string;
//     };
//     koda: {
//       purple: string;
//       orange: string;
//     };
//   };
  
//   export type Theme = {
//     dark: boolean;
//     colors: ThemeColors;
//   };
  
//   export type ThemeContextType = {
//     theme: Theme;
//     toggleTheme: () => void;
//   };

export type ThemeColors = {
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  secondary: {
    DEFAULT: string;
    foreground: string;
  };
  background: string;
  foreground: string;
  card: {
    DEFAULT: string;
    foreground: string;
  };
  muted: {
    DEFAULT: string;
    foreground: string;
  };
};

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
};


export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};