import React, { useEffect, useState } from "react";
import { apiHelpers } from "../lib/api";

export default function HealthCheckExample() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const result = await apiHelpers.healthCheck();
        setStatus(result.status);
        setError(null);
        console.log("Health check success:", result);
      } catch (err) {
        setStatus(null);
        setError(err.response ? err.response.data : err.message);
        console.error("Health check failed:", err.response ? err.response.status : err.message, err.response ? err.response.data : err);
      }
    }
    checkHealth();
  }, []);

  return (
    <div>
      <h2>Backend Health Check</h2>
      {status ? (
        <div style={{ color: "green" }}>Status: {status}</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error: {JSON.stringify(error)}</div>
      ) : (
        <div>Checking...</div>
      )}
    </div>
  );
}
