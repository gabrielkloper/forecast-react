import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
        const initialTheme = prefersLightScheme.matches ? "light" : "dark";
        setTheme(initialTheme);

        document.body.classList.add(initialTheme);

        const handleChange = (e) => {
            const newTheme = e.matches ? "light" : "dark";
            setTheme(newTheme);
            document.body.classList.remove("light", "dark");
            document.body.classList.add(newTheme);
        };

        prefersLightScheme.addEventListener("change", handleChange);

        return () => {
            prefersLightScheme.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}