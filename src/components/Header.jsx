import { Link } from "react-router-dom";
function Header({ settings }) {
  console.log(settings);
  return (
    <>
      <div className="wrap">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md d-flex align-items-center">
              <div className="phone phone_hover">
                <span className="mailus">
                  <i className="fa fa-phone"></i>
                </span>
                <a href="tel:01867417944">{settings.phone}</a>
              </div>
              <div className="phone mail_hover">
                <span className="mailus">
                  <i className="fa fa-envelope-o"></i>
                </span>
                <a href="mailto:ask@prodevsltd.com">{settings.email}</a>
              </div>
            </div>
            <div className="col-12 col-md d-flex justify-content-md-end">
              <div className="social-media">
                <p className="mb-0 d-flex">
                  <a
                    href={settings.facebook}
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-facebook">
                      <i className="sr-only">Facebook</i>
                    </span>
                  </a>

                  <a
                    href={settings.twitter}
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-twitter">
                      <i className="sr-only">Twitter</i>
                    </span>
                  </a>

                  <a
                    href={settings.Linkedin}
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-Linkedin">
                      <i className="sr-only">Linkedin</i>
                    </span>
                  </a>

                  <a
                    href={settings.youtube}
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-youtube">
                      <i className="sr-only">Linkedin</i>
                    </span>
                  </a>

                  <a
                    href={settings.instagram}
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-instagram">
                      <i className="sr-only">Linkedin</i>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link className="navbar-brand">
            <img
              height="40px"
              src={
                settings.header_logo
                  ? `http://localhost/prodevsltd.com/public/${settings.header_logo}`
                  : null
              }
              alt={settings.alternate_text}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item {{ request()->is('/') ? 'active' : '' }}">
                <Link to="/" className="nav-Link">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  href=""
                  className="nav-Link dropdown-toggle"
                  type="button"
                  id="service-menu"
                  data-toggle="dropdown"
                >
                  Services
                </a>
                <div className="dropdown-menu" aria-labelledby="service-menu">
                  <a
                    className="dropdown-item"
                    href="{{ route('service.details', $item->slug) }}"
                  >
                    {/* {{ $item->name }} */}
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-Link dropdown-toggle"
                  id="product-menu"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Products
                </a>
                <ul className="dropdown-menu" aria-labelledby="product-menu">
                  <li className="dropdown-submenu">
                    <a
                      className="dropdown-item"
                      href="{{ route('products.list', $category->slug )}}"
                    >
                      {/* {{ $category->name }} */}
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item {{ request()->is('career*') ? 'active' : '' }}">
                <a href="{{ route('career') }}" className="nav-Link">
                  Career
                </a>
              </li>
              <li className="nav-item {{ request()->is('contact-us') ? 'active' : '' }}">
                <a href="{{ route('contact.us') }}" className="nav-Link">
                  Contact
                </a>
              </li>
              <li className="nav-item {{ request()->is('blog') ? 'active' : (request()->is('blog-details*') ? 'active' : '') }}">
                <a href="{{ route('blogs') }}" className="nav-Link">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
