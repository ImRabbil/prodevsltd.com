import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getServiceDetails, getServices } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export default function ServiceDetails() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServiceDetails(slug).then(setService).catch(() => {});
    getServices().then(setServices).catch(() => {});
  }, [slug]);

  if (!service) {
    return (
      <section className="ftco-section">
        <div className="container">
          <p>Loading…</p>
        </div>
      </section>
    );
  }

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
                  Service Details <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">{service.name}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="row">
                {/* Main content */}
                <div className="col-md-8">
                  {service.media?.path && (
                    <div className="image">
                      <img
                        src={assetUrl(service.media.path)}
                        alt={service.media?.alt_text || service.name}
                      />
                    </div>
                  )}
                  <div className="text">
                    <h3 className="mt-3">{service.name}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: service.description || "",
                      }}
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card custom_card">
                        <ul>
                          {services.map((item) => (
                            <li key={item.id}>
                              <Link
                                to={`/services/${item.slug}`}
                                className={
                                  item.slug === slug ? "active" : ""
                                }
                                style={
                                  item.slug === slug
                                    ? {
                                        background: "#1f1f1f",
                                        color: "#fcbb15",
                                      }
                                    : {}
                                }
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
