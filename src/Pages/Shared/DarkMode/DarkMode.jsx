import { useEffect, useState } from "react";
import { CiLight ,CiDark } from "react-icons/ci";

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
    <>
      <button onClick={handleTheme} className="btn btn-circle border-none dark:text-white transition-all text-xl ">
        {theme === "dark" ? (
          <CiLight></CiLight>
        ) : (
          <CiDark></CiDark>
        )}
      </button>
    </>
  );
};

export default DarkMode;
