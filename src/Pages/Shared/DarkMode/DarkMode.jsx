import { useEffect, useState } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("prefers-color-scheme: dark").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="hidden md:block">
      <button onClick={handleTheme} className="btn btn-circle glass bg-gray-800 dark:bg-transparent text-white dark:text-white text-xl">
        {theme === "dark" ? (
          "light"
        ) : (
          "Dark"
        )}
      </button>
    </div>
  );
};

export default DarkMode;
