import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

function Header({ setting = {}, services = [], categories = [] }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="wrap">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md d-flex align-items-center">
              {setting?.phone && (
                <div className="phone phone_hover">
                  <span className="mailus">
                    <i className="fa fa-phone"></i>
                  </span>
                  <a href={`tel:${setting.phone}`}>{setting.phone}</a>
                </div>
              )}
              {setting?.email && (
                <div className="phone mail_hover">
                  &nbsp;
                  <span className="mailus">
                    <i className="fa fa-envelope-o"></i>
                  </span>
                  <a href={`mailto:${setting.email}`}>{setting.email}</a>
                </div>
              )}
            </div>
            <div className="col-12 col-md d-flex justify-content-md-end">
              <div className="social-media">
                <p className="mb-0 d-flex">
                  {setting?.facebook && (
                    <a
                      href={setting.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-facebook">
                        <i className="sr-only">Facebook</i>
                      </span>
                    </a>
                  )}
                  {setting?.twitter && (
                    <a
                      href={setting.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-twitter">
                        <i className="sr-only">Twitter</i>
                      </span>
                    </a>
                  )}
                  {setting?.linkedin && (
                    <a
                      href={setting.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-linkedin">
                        <i className="sr-only">LinkedIn</i>
                      </span>
                    </a>
                  )}
                  {setting?.youtube && (
                    <a
                      href={setting.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-youtube">
                        <i className="sr-only">YouTube</i>
                      </span>
                    </a>
                  )}
                  {setting?.instagram && (
                    <a
                      href={setting.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-instagram">
                        <i className="sr-only">Instagram</i>
                      </span>
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          {setting?.header_logo && (
            <Link className="navbar-brand" to="/">
              <img
                height="40px"
                src={assetUrl(setting.header_logo)}
                alt={setting.alternate_text || "Logo"}
              />
            </Link>
          )}

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="ftco-nav"
            aria-expanded={navOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="fa fa-bars"></span>
          </button>

          <div
            className={`collapse navbar-collapse${navOpen ? " show" : ""}`}
            id="ftco-nav"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                  onClick={() => setNavOpen(false)}
                >
                  Home
                </NavLink>
              </li>

              {/* Services dropdown */}
              {services.length > 0 && (
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="service-menu"
                    data-toggle="dropdown"
                    onClick={(e) => e.preventDefault()}
                  >
                    Services
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="service-menu"
                  >
                    {services.map((item) => (
                      <Link
                        key={item.id}
                        className="dropdown-item"
                        to={`/services/${item.slug}`}
                        onClick={() => setNavOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </li>
              )}

              {/* Products dropdown */}
              {categories.length > 0 && (
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="product-menu"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    Products
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="product-menu"
                  >
                    {categories.map((category) => (
                      <li key={category.id} className="dropdown-submenu">
                        <Link
                          className="dropdown-item"
                          to={`/products/${category.slug}`}
                          onClick={() => setNavOpen(false)}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <NavLink
                  to="/career"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                  onClick={() => setNavOpen(false)}
                >
                  Career
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                  onClick={() => setNavOpen(false)}
                >
                  Contact
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                  onClick={() => setNavOpen(false)}
                >
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
