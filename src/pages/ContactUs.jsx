import { useState } from "react";
import { Link } from "react-router-dom";
import { postContact } from "../api/client";
import { useGlobalData } from "../features/shared/hooks/useGlobalData";

export default function ContactUs() {
  const { data: globalData } = useGlobalData();
  const setting = globalData?.setting ?? null;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setSuccess("");
    try {
      const data = await postContact(form);
      if (data.res_status === 1) {
        setSuccess(
          "We have received your request. Our concern team will contact you soon. Thank you.",
        );
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setErrors(
          typeof data.error === "object" ? data.error : { general: data.error },
        );
      }
    } catch {
      setErrors({ general: "Could not connect. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
                  Contact Us <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Contact us</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7 d-flex align-items-stretch">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-3">Get in touch</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Name *"
                                required
                              />
                              {errors.name && (
                                <span className="text-danger">{errors.name[0]}</span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="number"
                                className="form-control"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Phone *"
                                required
                              />
                              {errors.phone && (
                                <span className="text-danger">{errors.phone[0]}</span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Email (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Subject *"
                                required
                              />
                              {errors.subject && (
                                <span className="text-danger">{errors.subject[0]}</span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea
                                name="message"
                                className="form-control"
                                rows="7"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Message *"
                                required
                              ></textarea>
                              {errors.message && (
                                <span className="text-danger">{errors.message[0]}</span>
                              )}
                            </div>
                          </div>
                          {errors.general && (
                            <div className="col-md-12 mb-3">
                              <span className="text-danger">{errors.general}</span>
                            </div>
                          )}
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                value={submitting ? "Sending…" : "Send Message"}
                                className="btn btn-primary font-weight"
                                disabled={submitting}
                              />
                            </div>
                          </div>
                          {success && (
                            <div className="col-md-12">
                              <div style={{ color: "#10a460", margin: "10px 0" }}>
                                {success}
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-stretch">
                    <div className="info-wrap bg-darken w-100 p-lg-5 p-4">
                      <h3 className="mb-4 mt-md-4">Contact us</h3>
                      {setting?.address && (
                        <div className="dbox w-100 d-flex align-items-start">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-map-marker"></span>
                          </div>
                          <div className="text pl-3">
                            <p>{setting.address}</p>
                          </div>
                        </div>
                      )}
                      {setting?.phone && (
                        <div className="dbox w-100 d-flex align-items-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-phone"></span>
                          </div>
                          <div className="text pl-3">
                            <p>
                              <a href={`tel:${setting.phone}`}>{setting.phone}</a>
                            </p>
                          </div>
                        </div>
                      )}
                      {setting?.email && (
                        <div className="dbox w-100 d-flex align-items-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-paper-plane"></span>
                          </div>
                          <div className="text pl-3">
                            <p>
                              <a href={`mailto:${setting.email}`}>{setting.email}</a>
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="dbox w-100 d-flex align-items-center">
                        <ul className="ftco-footer-social list-unstyled mt-md-4">
                          {setting?.facebook && (
                            <li className="ftco-animate">
                              <a href={setting.facebook} target="_blank" rel="noreferrer">
                                <span className="fa fa-facebook"></span>
                              </a>
                            </li>
                          )}
                          {setting?.twitter && (
                            <li className="ftco-animate">
                              <a href={setting.twitter} target="_blank" rel="noreferrer">
                                <span className="fa fa-twitter"></span>
                              </a>
                            </li>
                          )}
                          {setting?.linkedin && (
                            <li className="ftco-animate">
                              <a href={setting.linkedin} target="_blank" rel="noreferrer">
                                <span className="fa fa-linkedin"></span>
                              </a>
                            </li>
                          )}
                          {setting?.youtube && (
                            <li className="ftco-animate">
                              <a href={setting.youtube} target="_blank" rel="noreferrer">
                                <span className="fa fa-youtube"></span>
                              </a>
                            </li>
                          )}
                          {setting?.instagram && (
                            <li className="ftco-animate">
                              <a href={setting.instagram} target="_blank" rel="noreferrer">
                                <span className="fa fa-instagram"></span>
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {setting?.map && (
              <div className="col-md-12 mt-5">
                <div
                  className="bg-white map"
                  dangerouslySetInnerHTML={{ __html: setting.map }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
