import React, { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme) => { },
});

export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setTheme] = useState(defaultTheme);


  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;
