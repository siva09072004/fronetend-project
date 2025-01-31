import React, { useState } from "react";

const DeleteSatelliteForm = ({ onHome }) => {
  const [satelliteId, setSatelliteId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/delsatellite/${satelliteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete satellite");
      alert("Satellite deleted successfully!");
      setSatelliteId("");
      onHome();
    } catch (error) {
      console.error(error.message);
      alert("Failed to delete satellite.");
    }
  };

  return (
    <div className="satellite-form-container">
      <form className="satellite-form" onSubmit={handleSubmit}>
        <h2>Delete a Satellite</h2>
        <div className="form-group">
          <label htmlFor="satelliteId">Enter Satellite ID to Delete:</label>
          <input
            type="text"
            id="satelliteId"
            value={satelliteId}
            onChange={(e) => setSatelliteId(e.target.value)}
          />
        </div>
        <button type="submit">Delete Satellite</button>
      </form>
      <button type="button" onClick={onHome} className="home-button">
        Home
      </button>
    </div>
  );
};

export default DeleteSatelliteForm;
