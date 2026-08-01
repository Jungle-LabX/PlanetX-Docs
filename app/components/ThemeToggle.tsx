"use client";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("planetx-theme", nextTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle color theme"
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__sun">☼</span>
        <span className="theme-toggle__moon">◐</span>
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  );
}
