import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCareerDetails } from "../api/client";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CareerDetails() {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);

  useEffect(() => {
    getCareerDetails(slug).then(setCareer).catch(() => {});
  }, [slug]);

  if (!career) {
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
            <div className="col-md-12 ftco-animate pb-5">
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
              <h1 className="mb-0 bread">{career.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row career-details">
            <div className="col-12">
              <h3 className="job-title">{career.title}</h3>
              <p>
                <b>Vacancy: </b> {career.vacancy}
              </p>

              {career.job_responsibilities && (
                <>
                  <p>
                    <b>Job Responsibilities:</b>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: career.job_responsibilities,
                    }}
                  />
                </>
              )}

              {career.technical_requirement && (
                <>
                  <p>
                    <b>Technical Requirements:</b>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: career.technical_requirement,
                    }}
                  />
                </>
              )}

              {career.educational_requirement && (
                <>
                  <p>
                    <b>Educational Requirements:</b>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: career.educational_requirement,
                    }}
                  />
                </>
              )}

              <p>
                <b>Experience: </b> {career.experience}
              </p>
              <p>
                <b>Job Nature: </b> {career.job_nature}
              </p>
              <p>
                <b>Job Location: </b> {career.job_location}
              </p>
              <p>
                <b>Salary Range: </b> {career.salary_range}
              </p>
              <p>
                <b>Working Days: </b> {career.working_days}
              </p>
              <p>
                <b>Working Hours: </b> {career.working_hours}
              </p>

              {career.compensation_other_benefit && (
                <>
                  <p>
                    <b>Compensation &amp; Other Benefits:</b>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: career.compensation_other_benefit,
                    }}
                  />
                </>
              )}

              {career.for_apply_instruction && (
                <>
                  <p>
                    <b>For Apply:</b>
                  </p>
                  <p>{career.for_apply_instruction}</p>
                </>
              )}

              <p>
                <b>Deadline:</b> {formatDate(career.deadline)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
