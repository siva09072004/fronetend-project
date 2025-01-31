import React, { useState } from "react";
import AddSatelliteForm from "./AddSatelliteForm";
import DeleteSatelliteForm from "./DeleteSatelliteForm";
import SearchSatelliteForm from "./SearchSatelliteForm";
import UpdateSatelliteForm from "./UpdateSatelliteForm";
import AllSatellites from "./AllSatellites"; // Import new component

const SatelliteDashboard = () => {
  const [currentView, setCurrentView] = useState("home");

  const handleNavigate = (view) => setCurrentView(view);

  const renderView = () => {
    switch (currentView) {
      case "add":
        return <AddSatelliteForm onHome={() => handleNavigate("home")} />;
      case "update":
        return <UpdateSatelliteForm onHome={() => handleNavigate("home")} />;
      case "search":
        return <SearchSatelliteForm onHome={() => handleNavigate("home")} />;
      case "delete":
        return <DeleteSatelliteForm onHome={() => handleNavigate("home")} />;
      case "all":
        return <AllSatellites onHome={() => handleNavigate("home")} />;
      default:
        return (
          <div className="dashboard-container">
            <h1>Satellite Dashboard</h1>
            <div className="actions-container">
              <button onClick={() => handleNavigate("add")}>Add Satellite</button>
              <button onClick={() => handleNavigate("update")}>Update Satellite</button>
              <button onClick={() => handleNavigate("search")}>Search Satellite</button>
              <button onClick={() => handleNavigate("delete")}>Delete Satellite</button>
              <button onClick={() => handleNavigate("all")}>View All Satellites</button>
            </div>
          </div>
        );
    }
  };

  return <div>{renderView()}</div>;
};

export default SatelliteDashboard;
