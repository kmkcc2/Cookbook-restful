import { Link } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";
export default function Header() {
  const [count, setCount] = useState(0);

  async function fetchDataHandler() {
    const response = await fetch(
      "http://127.0.0.1:9090/actuator/metrics/http.server.requests"
    );
    const data = await response.json();
    setCount(data.measurements[0].value);
  }
  useEffect(() => {
    fetchDataHandler();
  }, []);

  return (
    <div className="header">
      <Link to="/recipes">
        <div className="header-option">Recipes</div>
      </Link>
      <div className="request-counter">Total requests: {count}</div>
    </div>
  );
}
