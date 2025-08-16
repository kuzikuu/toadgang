import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PurplePondSpheres from "./PurplePondSpheres.jsx";
import { MiniKitContextProvider } from "./providers/MiniKitProvider.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MiniKitContextProvider>
      <PurplePondSpheres />
    </MiniKitContextProvider>
  </React.StrictMode>
);
