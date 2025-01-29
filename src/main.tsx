import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import YourPen from "./YourPen.tsx";
import Static from "./Static.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Static />} />
        <Route path="/" element={<YourPen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
