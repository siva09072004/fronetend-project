import React, { useState } from "react";

const UpdateSatelliteForm = ({ onHome }) => {
  const [satelliteId, setSatelliteId] = useState("");
  const [satellite, setSatellite] = useState({
    id: "",
    name: "",
    orbitType: "",
    speed: "",
    altitude: "",
    latitude: "",
    longitude: "",
    visibility: "",
    details: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/updatesatellite/${satelliteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(satellite),
      });
      if (!response.ok) throw new Error("Failed to update satellite");
      const data = await response.json();
      alert("Satellite updated successfully!");
      setSatelliteId("");
      setSatellite({
        id: "",
        name: "",
        orbitType: "",
        speed: "",
        altitude: "",
        latitude: "",
        longitude: "",
        visibility: "",
        details: "",
      });
      onHome();
    } catch (error) {
      console.error(error.message);
      alert("Failed to update satellite.");
    }
  };

  return (
    <div className="satellite-form-container">
      <form className="satellite-form" onSubmit={handleSubmit}>
        <h2>Update Satellite Details</h2>
        <div className="form-group">
          <label htmlFor="satelliteId">Enter Satellite ID to Update:</label>
          <input
            type="text"
            id="satelliteId"
            value={satelliteId}
            onChange={(e) => setSatelliteId(e.target.value)}
          />
        </div>
        {Object.keys(satellite).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={satellite[field]}
              onChange={(e) =>
                setSatellite((prev) => ({ ...prev, [e.target.name]: e.target.value }))
              }
            />
          </div>
        ))}
        <button type="submit">Update Satellite</button>
      </form>
      <button type="button" onClick={onHome} className="home-button">
        Home
      </button>
    </div>
  );
};

export default UpdateSatelliteForm;
