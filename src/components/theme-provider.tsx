import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  setTheme?: (theme: "light" | "dark") => void;
};

export const ThemeProvider = ({
  children,
  theme: controlledTheme,
  setTheme: controlledSetTheme,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  const isControlled =
    controlledTheme !== undefined && controlledSetTheme !== undefined;
  const themeValue = isControlled ? controlledTheme : theme;
  const setTheme = isControlled
    ? controlledSetTheme
    : (t: "light" | "dark") => setThemeState(t);

  useEffect(() => {
    document.documentElement.className = themeValue;
    localStorage.setItem("theme", themeValue);
  }, [themeValue]);

  const toggleTheme = () => setTheme(themeValue === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme: themeValue, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
