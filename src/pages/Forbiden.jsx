import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Forbidden</h1>
      <p>No permission to access this page.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to the homepage
      </Link>
    </div>
  );
}

export default Forbidden;
