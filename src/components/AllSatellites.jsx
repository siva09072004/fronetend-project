import React, { useState, useEffect } from "react";

const AllSatellites = ({ onHome }) => {
  const [satellites, setSatellites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/allsatellite");
        if (!response.ok) throw new Error("Failed to fetch satellites");
        const data = await response.json();
        setSatellites(data);
      } catch (error) {
        console.error("Error fetching satellites:", error.message);
        alert("Failed to fetch satellites");
      } finally {
        setLoading(false);
      }
    };

    fetchSatellites();
  }, []);

  return (
    <div className="satellite-list-container">
      <h2>All Satellites</h2>
      {loading ? (
        <p>Loading...</p>
      ) : satellites.length > 0 ? (
        <table className="satellite-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Orbit Type</th>
              <th>Speed</th>
              <th>Altitude</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Visibility</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map((satellite, index) => (
              <tr key={satellite.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{satellite.id}</td>
                <td>{satellite.name}</td>
                <td>{satellite.orbitType}</td>
                <td>{satellite.speed}</td>
                <td>{satellite.altitude}</td>
                <td>{satellite.latitude}</td>
                <td>{satellite.longitude}</td>
                <td>{satellite.visibility ? "Yes" : "No"}</td>
                <td>{satellite.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No satellites found.</p>
      )}
      <button type="button" onClick={onHome} className="home-button">
        Home
      </button>
      <style jsx>{`
        .satellite-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .satellite-table th, .satellite-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .satellite-table th {
          background-color: #f4f4f4;
        }
        .even-row {
          background-color: #f9f9f9;
        }
        .odd-row {
          background-color: #ffffff;
        }
        .satellite-table tr:hover {
          background-color: #ddd;
        }
        .home-button {
          margin-top: 20px;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .home-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AllSatellites;
