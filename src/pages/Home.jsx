import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { useGlobalData } from "../features/shared/hooks/useGlobalData";
import { useHomeData } from "../features/home/hooks/useHomeData";
import { assetUrl } from "../lib/assetUrl";

/** Initialise/destroy an Owl Carousel via jQuery. */
function useOwlCarousel(ref, options, deps = []) {
  useEffect(() => {
    const $ = window.$;
    if (!$ || !ref.current || typeof $.fn?.owlCarousel !== "function") return;

    const $el = $(ref.current);
    if ($el.children().length === 0) return;

    if ($el.data("owl.carousel")) return;

    $el.owlCarousel(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Simple animated counter using Intersection Observer. */
function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const end = parseInt(target, 10);
          const duration = 2000;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start = Math.min(start + step, end);
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <strong className="number" ref={ref}>
      {count}
    </strong>
  );
}

export default function Home() {
  const {
    data: globalData,
    isLoading: isGlobalLoading,
    isError: isGlobalError,
    refetch: refetchGlobal,
  } = useGlobalData();
  const {
    data: homeData,
    isLoading: isHomeLoading,
    isError: isHomeError,
    refetch: refetchHome,
  } = useHomeData();

  const sliderRef = useRef(null);
  const testimonialRef = useRef(null);
  const clientRef = useRef(null);

  const setting = globalData?.setting ?? null;
  const services = globalData?.services ?? [];
  const sliders = homeData?.sliders ?? [];
  const projects = homeData?.projects ?? [];
  const testimonials = homeData?.testimonials ?? [];
  const clients = homeData?.clients ?? [];

  useOwlCarousel(
    sliderRef,
    {
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      nav: true,
      dots: false,
      autoplayHoverPause: true,
      animateOut: "fadeOut",
      navText: [
        "<span class='fa fa-chevron-left'></span>",
        "<span class='fa fa-chevron-right'></span>",
      ],
    },
    [sliders.length],
  );

  useOwlCarousel(
    testimonialRef,
    {
      loop: false,
      autoplay: true,
      margin: 30,
      stagePadding: 0,
      nav: false,
      dots: true,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 },
      },
    },
    [testimonials.length],
  );

  useOwlCarousel(
    clientRef,
    {
      loop: true,
      autoplay: false,
      margin: 30,
      nav: true,
      dots: false,
      navText: [
        "<span class='fa fa-chevron-left'></span>",
        "<span class='fa fa-chevron-right'></span>",
      ],
      responsive: {
        0: { items: 2 },
        600: { items: 4 },
        1000: { items: 6 },
      },
    },
    [clients.length],
  );

  const years = setting?.established_date
    ? new Date().getFullYear() -
      new Date(setting.established_date).getFullYear()
    : 0;

  if (isGlobalLoading || isHomeLoading) {
    return <HomeSkeleton />;
  }

  if (isGlobalError || isHomeError) {
    return (
      <section className="ftco-section">
        <div className="container text-center">
          <h3>Could not load homepage data.</h3>
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              refetchGlobal();
              refetchHome();
            }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero-wrap">
        <div className="home-slider owl-carousel js-fullheight" ref={sliderRef}>
          {sliders.map((slider, i) => (
            <div
              key={i}
              className="slider-item js-fullheight"
              style={{ backgroundImage: "url(/assets/images/bg-1.jpg)" }}
            >
              <div className="overlay"></div>
              <div className="container">
                <div className="row d-flex no-gutters slider-text js-fullheight align-items-center justify-content-between align-items-stretch">
                  <div className="col-md-5 col-12 ftco-animate d-flex align-items-center justify-content-start">
                    <div className="text w-100 banner-img">
                      {slider.media?.path && (
                        <img
                          loading="lazy"
                          src={assetUrl(slider.media.path)}
                          alt={slider.media?.alt_text || ""}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-5 ftco-animate d-flex align-items-center justify-content-end">
                    <div className="text w-100 banner-text">
                      <h2>{slider.name}</h2>
                      <p className="mb-4">{slider.description}</p>
                      <p>
                        <a href="/contact-us" className="btn btn-primary">
                          Get Started
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ftco-section ftco-services">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-self-stretch ftco-animate">
              <div className="pb-4 heading-section heading-section-white">
                <h2 className="mb-3">Services</h2>
                <p className="mb-4">
                  Customer service should not be a department. It should be the
                  entire company
                </p>
              </div>
            </div>
            {services.map((item) => (
              <div
                key={item.id}
                className="col-md-3 d-flex align-self-stretch ftco-animate"
              >
                <div className="services active">
                  <div className="d-flex justify-content-center">
                    <div
                      className="icon d-flex"
                      dangerouslySetInnerHTML={{ __html: item.icon || "" }}
                    />
                  </div>
                  <div className="media-body text-center">
                    <h3 className="heading mb-3">{item.name}</h3>
                  </div>
                  <Link
                    to={`/services/${item.slug}`}
                    className="btn-custom d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-chevron-right"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-about ftco-no-pt ftco-no-pb img">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-12 about-intro">
              <div className="row d-flex">
                <div className="col-md-6 d-flex align-items-stretch">
                  <div
                    className="img d-flex align-items-center align-self-stretch justify-content-center"
                    style={{
                      backgroundImage: "url(/assets/images/about-us-bg.jpg)",
                    }}
                  ></div>
                </div>
                <div className="col-md-6 pl-md-5 py-5">
                  <div className="row justify-content-start pb-3 pt-md-5">
                    <div className="col-md-12 heading-section ftco-animate">
                      <span className="subheading">We are</span>
                      <h1 className="mb-4">
                        Professional Software, Digital and IT Solutions Company
                      </h1>
                      <p>
                        Pro Devs Ltd. is a digital transformation consultancy and
                        software development company that provides cutting edge
                        software engineering solutions, helping companies and
                        enterprise clients untangle complex issues that always
                        emerge during their digital evolution journey. Since 2022
                        we have been a visionary and a reliable software
                        engineering partner for companies &amp; brands.
                      </p>
                      {years > 0 && (
                        <div className="year-stablish d-flex">
                          <div className="icon2 d-flex align-items-center justify-content-center">
                            <span className="flaticon-light-bulb"></span>
                          </div>
                          <div className="text pl-4">
                            <AnimatedCounter target={years} />
                            <span>
                              Year Of
                              <br /> Experienced
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ftco-section ftco-counter img"
        id="section-counter"
        style={{ backgroundImage: "url(/assets/images/stat.jpg)" }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            {[
              {
                icon: "flaticon-file",
                value: setting?.completed_project,
                label: "Project Completed",
              },
              {
                icon: "flaticon-waiter",
                value: setting?.team_member,
                label: "Team Members",
              },
              {
                icon: "flaticon-customer-service",
                value: setting?.service,
                label: "Service Provide",
              },
              {
                icon: "flaticon-good-review",
                value: setting?.clients,
                label: "Happy Clients",
              },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="col-md-3 d-flex counter-wrap ftco-animate"
              >
                <div className="block-18 d-flex align-items-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className={icon}></span>
                  </div>
                  <div className="text pl-3">
                    <AnimatedCounter target={value || 0} />
                    <span>{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-portfolio">
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-between pb-5">
            <div className="col-md-6 col-lg-6 heading-section heading-section-white ftco-animate">
              <span className="subheading">Portfolio</span>
              <h2 className="mb-4">
                Our Recent <br />
                Projects
              </h2>
            </div>
            <div className="col-md-4 col-lg-3 d-flex align-items-center justify-content-end">
              <Link to="/projects" className="btn-custom">
                View All Projects <span className="fa fa-chevron-right"></span>
              </Link>
            </div>
          </div>
          <div className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-md-4 ftco-animate">
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
                    <a
                      href={project.url || "#"}
                      className="icon d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-chevron-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ftco-section testimony-section ftco-no-pt bg-light">
        <div className="overlay"></div>
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-7 heading-section ftco-animate">
              <span className="subheading">Testimonial</span>
              <h2 className="mb-4">
                Clients Say <br />
                About Our Works
              </h2>
            </div>
          </div>
        </div>
        <div className="container-fluid px-lg-5">
          <div className="row ftco-animate">
            <div className="col-md-12">
              <div
                className="carousel-testimony owl-carousel"
                ref={testimonialRef}
              >
                {testimonials.map((item) => (
                  <div key={item.id} className="item">
                    <div className="testimony-wrap py-4">
                      <div className="text">
                        <p className="mb-4 testimony_text">{item.message}</p>
                        <div className="d-flex align-items-center">
                          <div
                            className="user-img"
                            style={{
                              backgroundImage: `url(/assets/images/testimonial/default_avatar.png)`,
                            }}
                          ></div>
                          <div className="pl-3">
                            <p className="star">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="fa fa-star"></span>
                              ))}
                            </p>
                            <p className="name">{item.name}</p>
                            <span
                              className="position"
                              style={{
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              {item.flag && (
                                <img
                                  style={{
                                    display: "inline-block",
                                    width: "20px",
                                  }}
                                  src={assetUrl(item.flag)}
                                  alt={item.country}
                                />
                              )}
                              &nbsp;&nbsp;{item.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section client-section ftco-no-pb">
        <div className="overlay"></div>
        <div className="container">
          <div className="row pb-4">
            <div className="col-md-7 heading-section ftco-animate">
              <span className="subheading">Clients</span>
              <h2 className="mb-4">
                Our Valuable <br />
                Clients
              </h2>
            </div>
          </div>
        </div>
        <div className="container px-lg-5">
          <div className="row ftco-animate">
            <div className="col-md-12">
              <div className="carousel-clients owl-carousel" ref={clientRef}>
                {clients.map((item) => (
                  <div key={item.id} className="item">
                    <div className="client-img-wrap">
                      <img
                        src={assetUrl(item.media?.path)}
                        alt={item.media?.alt_text || ""}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
