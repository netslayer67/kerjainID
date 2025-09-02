// ThemeToggle.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
        fixed bottom-16 right-6 z-50
        rounded-full p-3
        shadow-lg
        backdrop-blur-xl
        border
        bg-background/70 dark:bg-background-dark/70
        border-border dark:border-border-dark
        text-foreground dark:text-foreground-dark overflow-hidden
      "
        >
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-small/[0.1] dark:bg-grid-small-dark/[0.15] rounded-full pointer-events-none" />

            {/* Icon */}
            {theme === "dark" ? (
                <Sun className="h-6 w-6 text-accent" />
            ) : (
                <Moon className="h-6 w-6 text-accent" />
            )}
        </motion.button>
    );
}
