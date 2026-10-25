import React from "react";
import { createRoot } from "react-dom/client";
// Base styles first, so component styles can override them
import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
