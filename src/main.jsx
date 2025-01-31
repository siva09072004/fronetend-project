//main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import SatelliteDashboard from "./components/SatelliteDashboard";
import AddSatelliteForm from "./components/AddSatelliteForm";
import UpdateSatelliteForm from "./components/UpdateSatelliteForm";
import SearchSatelliteForm from "./components/SearchSatelliteForm";
import DeleteSatelliteForm from "./components/DeleteSatelliteForm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<SatelliteDashboard />} />
          <Route path="add" element={<AddSatelliteForm />} />
          <Route path="update" element={<UpdateSatelliteForm />} />
          <Route path="search" element={<SearchSatelliteForm />} />
          <Route path="delete" element={<DeleteSatelliteForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
