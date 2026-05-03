function Hero({ sliders }) {
  return (
    <section className="hero-wrap">
      <div className="home-slider owl-carousel js-fullheight">
        {sliders &&
          sliders.length > 0 &&
          sliders.map((slider, index) => (
            <div
              key={index}
              className="slider-item js-fullheight"
              style={{
                backgroundImage: `url(/frontEnd/images/bg-1.jpg)`,
              }}
            >
              <div className="overlay"></div>

              <div className="container">
                <div className="row d-flex no-gutters slider-text js-fullheight align-items-center justify-content-between align-items-stretch">
                  {/* LEFT IMAGE */}
                  <div className="col-md-5 col-12 ftco-animate d-flex align-items-center justify-content-start">
                    <div className="text w-100 banner-img">
                      <img
                        src={
                          slider.media?.path
                            ? `http://localhost/prodevsltd.com/public/${slider.media.path}`
                            : null
                        }
                        alt={slider.media?.alt_text || "slider image"}
                      />
                    </div>
                  </div>

                  {/* RIGHT TEXT */}
                  <div className="col-md-5 ftco-animate d-flex align-items-center justify-content-end">
                    <div className="text w-100 banner-text">
                      <h2>{slider.name}</h2>
                      <p className="mb-4">{slider.description}</p>
                      <p>
                        <a href="#" className="btn btn-primary">
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
  );
}

export default Hero;
