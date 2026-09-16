import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext();

const getInitialMode = () => {
  try {
    const stored = window.localStorage.getItem("theme-mode");
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {
    // localStorage unavailable, fall back to default
  }
  return "dark";
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: getInitialMode(),
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.mode);
    try {
      window.localStorage.setItem("theme-mode", state.mode);
    } catch (e) {
      // ignore write errors (e.g. private browsing)
    }
  }, [state.mode]);

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  const toggleMode = () => {
    changeMode(state.mode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
