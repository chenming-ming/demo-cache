import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./pages/registerPage/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
