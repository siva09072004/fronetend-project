import React, { useState, useEffect } from "react";

const SearchSatelliteForm = ({ onHome }) => {
  const [satelliteSearch, setSatelliteSearch] = useState(""); 
  const [satelliteDetails, setSatelliteDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!satelliteSearch) {
      alert("Please enter a satellite name or ID.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/satellite?name=${satelliteSearch}`
      );
      if (!response.ok) throw new Error("Failed to fetch satellite");
      const data = await response.json();
      setSatelliteDetails(data);
      setSatelliteSearch("");
    } catch (error) {
      console.error(error.message);
      alert("Failed to search satellite.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
      if (satelliteSearch) {
        socket.send(JSON.stringify({ satelliteName: satelliteSearch }));
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSatelliteDetails(data);
    };

    return () => {
      socket.close();
    };
  }, [satelliteSearch]);

  return (
    <div className="satellite-form-container">
      <form className="satellite-form" onSubmit={handleSubmit}>
        <h2>Search a Satellite</h2>
        <div className="form-group">
          <label htmlFor="satelliteSearch">
            Enter Satellite Name or ID to Search:
          </label>
          <input
            type="text"
            id="satelliteSearch"
            value={satelliteSearch}
            onChange={(e) => setSatelliteSearch(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Satellite"}
        </button>
      </form>
      <button type="button" onClick={onHome} className="home-button">
        Home
      </button>

      {satelliteDetails && (
        <div className="satellite-details">
          <h3>Satellite Details:</h3>
          <table>
            <tbody>
              {Object.entries(satelliteDetails).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ fontWeight: "bold" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </td>
                  <td>
                    {key === "visibility"
                      ? value
                        ? "Yes"
                        : "No"
                      : value !== null && value !== undefined
                      ? value
                      : "Not Available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Current Position:</h4>
          <p>Latitude: {satelliteDetails.latitude}</p>
          <p>Longitude: {satelliteDetails.longitude}</p>
          <p>Altitude: {satelliteDetails.altitude}</p>

          <h4>Live Video:</h4>
          <iframe
            src="https://www.youtube.com/embed/0FBiyFpV__g?autoplay=1"
            width="600"
            height="400"
            title="Live Video"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SearchSatelliteForm;
