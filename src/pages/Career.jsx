import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCareers } from "../api/client";

function isPastDeadline(deadline) {
  if (!deadline) return false;
  return new Date(deadline) <= new Date();
}

export default function Career() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    getCareers().then(setCareers).catch(() => {});
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
                  Career <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Career</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Career list */}
      <section className="ftco-section">
        <div className="container">
          {careers.map((item) => {
            const closed = isPastDeadline(item.deadline);
            return (
              <div key={item.id} className="row career mb-3">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <span
                        className={`badge badge-${closed ? "danger" : "success"}`}
                      >
                        {closed ? "Closed" : "Open"}
                      </span>
                      <Link
                        to={closed ? "#" : `/career/${item.slug}`}
                        onClick={(e) => closed && e.preventDefault()}
                        style={closed ? { pointerEvents: "none" } : {}}
                      >
                        <h4 className="job-title">
                          <b style={{ color: "black" }}>Job Title:</b>{" "}
                          {item.title}
                        </h4>
                      </Link>
                      <p>
                        <b>Vacancy: </b> {item.vacancy}
                      </p>
                      <p>
                        <b>Experience: </b> {item.experience}
                      </p>
                      <p>
                        <b>Job Nature: </b> {item.job_nature}
                      </p>
                      <p>
                        <b>Location: </b> {item.job_location}
                      </p>
                      <Link
                        to={`/career/${item.slug}`}
                        className={`btn btn-primary mt-md-4 fw-bold${closed ? " disabled" : ""}`}
                        style={closed ? { pointerEvents: "none" } : {}}
                      >
                        View Details &amp; Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
