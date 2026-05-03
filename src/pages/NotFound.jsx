import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="ftco-section">
      <div className="container text-center py-5">
        <h1 style={{ fontSize: "120px", fontWeight: 700, color: "#fcbb15" }}>
          404
        </h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="mb-5">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
