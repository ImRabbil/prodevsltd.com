import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPageSettings } from "../api/client";

export default function TermsAndConditions() {
  const [content, setContent] = useState("");

  useEffect(() => {
    getPageSettings()
      .then((data) => setContent(data?.terms_conditions || ""))
      .catch(() => {});
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
                  Terms &amp; Conditions{" "}
                  <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Terms &amp; Conditions</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div
              className="col-12"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
