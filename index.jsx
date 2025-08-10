import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PurplePondSpheres from "./PurplePondSpheres.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PurplePondSpheres />
  </React.StrictMode>
);
