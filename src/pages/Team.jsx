import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeam } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export default function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeam().then(setTeams).catch(() => {});
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
                  Team <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Team</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Team members */}
      <section className="ftco-section">
        <div className="container">
          <div className="row no-gutters pb-5 justify-content-between">
            <div className="col-md-7 col-lg-6 heading-section ftco-animate">
              <span className="subheading">Meet The Team</span>
              <h2 className="mb-4">
                Professional <br />
                Creative Team Members
              </h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {teams.map((item) => (
              <div key={item.id} className="col-md-3 col-12 mb-4">
                <div className="card" style={{ border: "unset" }}>
                  <div className="card-body p-0">
                    <img
                      width="100%"
                      style={{
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                      src={assetUrl(item.media?.path)}
                      alt={item.media?.alt_text || item.name}
                    />
                  </div>
                  <div
                    className="card-header text-center"
                    style={{
                      height: 110,
                      background: "#1f1f1f",
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      padding: "20px 15px",
                    }}
                  >
                    <h5 className="devs_name">{item.name}</h5>
                    <span className="position">{item.designation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
