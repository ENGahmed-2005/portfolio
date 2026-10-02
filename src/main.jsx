import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { I18nProvider } from "./i18n.jsx";
import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
