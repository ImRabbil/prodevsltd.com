import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { postNewsletter } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon-tabler icons-tabler-outline icon-tabler-chevron-right"
    style={{ verticalAlign: "middle" }}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 6l6 6l-6 6" />
  </svg>
);

function Footer({ setting = {}, services = [], categories = [] }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");
    try {
      const data = await postNewsletter({ email });
      if (data.res_status === 1) {
        setSuccess("Thanks for your subscription!");
        setEmail("");
      } else {
        setError(
          typeof data.error === "object"
            ? Object.values(data.error)[0]?.[0]
            : data.error || "An unexpected error occurred."
        );
      }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Newsletter section */}
      <section className="ftco-intro ftco-section ftco-no-pb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <div
                className="img"
                style={{
                  backgroundImage:
                    "url(/assets/images/newsletter-bg-1.jpg)",
                }}
              >
                <div className="overlay"></div>
                <h2>Subscribe Newsletter</h2>
                <p>Sign Up to our Newsletter and get our latest updates</p>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <form
                      onSubmit={handleNewsletter}
                      className="subscribe-form"
                    >
                      <div className="form-group d-flex mb-2">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="off"
                          placeholder="Enter email address"
                          required
                          ref={inputRef}
                        />
                        <input
                          type="submit"
                          value={submitting ? "Submitting…" : "Subscribe"}
                          className="submit px-3"
                          disabled={submitting}
                        />
                      </div>
                      {success && (
                        <div
                          className="form-group d-flex mb-2"
                          style={{ color: "green" }}
                        >
                          {success}
                        </div>
                      )}
                      {error && (
                        <div
                          className="form-group d-flex mb-2"
                          style={{ color: "red" }}
                        >
                          {error}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ftco-footer">
        <div className="container">
          <div className="row mb-2">
            {/* Company info */}
            <div className="col-sm-12 col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2 logo">
                  {setting?.footer_logo && (
                    <Link to="/">
                      <img
                        src={assetUrl(setting.footer_logo)}
                        className="img-fluid"
                        alt={setting.alternate_text || "Logo"}
                      />
                    </Link>
                  )}
                </h2>
                <div className="block-23 mb-3">
                  <ul>
                    {setting?.address && (
                      <li>
                        <span className="icon fa fa-map-marker"></span>
                        <span className="text">{setting.address}</span>
                      </li>
                    )}
                    {setting?.phone && (
                      <li>
                        <a href={`tel:${setting.phone}`}>
                          <span className="icon fa fa-phone"></span>
                          <span className="text">{setting.phone}</span>
                        </a>
                      </li>
                    )}
                    {setting?.email && (
                      <li>
                        <a href={`mailto:${setting.email}`}>
                          <span className="icon fa fa-paper-plane"></span>
                          <span className="text">
                            <span>{setting.email}</span>
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <ul className="ftco-footer-social list-unstyled mt-md-5">
                  {setting?.facebook && (
                    <li className="ftco-animate">
                      <a
                        href={setting.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-facebook"></span>
                      </a>
                    </li>
                  )}
                  {setting?.twitter && (
                    <li className="ftco-animate">
                      <a
                        href={setting.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-twitter"></span>
                      </a>
                    </li>
                  )}
                  {setting?.linkedin && (
                    <li className="ftco-animate">
                      <a
                        href={setting.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-linkedin"></span>
                      </a>
                    </li>
                  )}
                  {setting?.youtube && (
                    <li className="ftco-animate">
                      <a
                        href={setting.youtube}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-youtube"></span>
                      </a>
                    </li>
                  )}
                  {setting?.instagram && (
                    <li className="ftco-animate">
                      <a
                        href={setting.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-instagram"></span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Info links */}
            <div className="col-sm-12 col-md">
              <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Info</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/about-us">
                      <ChevronRight /> About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us">
                      <ChevronRight /> Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">
                      <ChevronRight /> Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">
                      <ChevronRight /> Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Important links */}
            <div className="col-sm-12 col-md">
              <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Important Links</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/career">
                      <ChevronRight /> Career
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <ChevronRight /> Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects">
                      <ChevronRight /> Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/team">
                      <ChevronRight /> Team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="col-sm-12 col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Services</h2>
                  <ul className="list-unstyled">
                    {services.map((item) => (
                      <li key={item.id}>
                        <Link to={`/services/${item.slug}`}>
                          <ChevronRight /> {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Product Categories */}
            {categories.length > 0 && (
              <div className="col-sm-12 col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Product Categories</h2>
                  <ul className="list-unstyled">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link to={`/products/${category.slug}`}>
                          <ChevronRight /> {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright bar */}
        <div className="container-fluid px-0 py-3 bg-black">
          <div className="container">
            <div className="row">
              <div className="col-md-12 d-md-flex d-sm-block text-center justify-content-between">
                <p className="mb-0" style={{ color: "rgba(255,255,255,.5)" }}>
                  Copyright &copy; 2022 &ndash; {new Date().getFullYear()} All
                  Rights Reserved By{" "}
                  <a href="https://prodevsltd.com">Pro Devs Ltd.</a>
                </p>
                <p className="mb-0" style={{ color: "rgba(255,255,255,.5)" }}>
                  Developed with{" "}
                  <i className="fa fa-heart" style={{ color: "red" }}></i> By{" "}
                  <a href="https://prodevsltd.com">Pro Devs Ltd. Team</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
