import React, { useState } from "react";

const AddSatelliteForm = ({ onHome }) => {
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

  const handleChange = ({ target: { name, value } }) => {
    setSatellite((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`http://localhost:3000/api/addsatellite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(satellite), // Sending the satellite data to the backend
      });

      if (!response.ok) throw new Error("Failed to add satellite");

      const data = await response.json();
      alert("Satellite added successfully!");

      // Clear the form fields after successful submission
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

      // Navigate to home
      onHome();
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to add satellite.");
    }
  };

  return (
    <div className="satellite-form-container">
      <form className="satellite-form" onSubmit={handleSubmit}>
        <h2>Add Satellite Details</h2>

        {Object.keys(satellite).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={satellite[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Add Satellite</button>
      </form>
      <button type="button" onClick={onHome} className="home-button">
        Home
      </button>
    </div>
  );
};

export default AddSatelliteForm;