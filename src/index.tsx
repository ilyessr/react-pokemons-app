import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  const newRootElement = document.createElement("div");
  newRootElement.id = "root";
  document.body.appendChild(newRootElement);

  createRoot(newRootElement).render(

      <App />

  );
}
