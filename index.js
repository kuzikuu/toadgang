import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // your Tailwind or custom styles
import PurplePondSpheres from "./PurplePondSpheres"; // the component we built

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PurplePondSpheres />
  </React.StrictMode>
);
