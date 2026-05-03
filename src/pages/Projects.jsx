import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchPage = (p) => {
    getProjects(`?page=${p}`)
      .then((data) => {
        // Support both paginated { data, last_page } and plain array
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects(data.data || []);
          setLastPage(data.last_page || 1);
        }
        setPage(p);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  return (
    <>
      {/* Page Banner */}
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: "url(/assets/images/bg-4.jpg)" }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end">
            <div className="col-md-9 ftco-animate">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link to="/">
                    Home <i className="fa fa-chevron-right"></i>
                  </Link>
                </span>{" "}
                <span>
                  Projects <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Projects</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-md-3 ftco-animate">
                <div
                  className="project-wrap img d-flex align-items-end"
                  style={{
                    backgroundImage: `url(${assetUrl(project.media?.path)})`,
                  }}
                >
                  <div className="text">
                    <span>{project.subtitle}</span>
                    <h3>
                      <a
                        href={project.url || "#"}
                        target={project.url ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {project.title}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {lastPage > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  {[...Array(lastPage)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item${page === i + 1 ? " active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => fetchPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
