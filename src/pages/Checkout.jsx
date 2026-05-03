import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { postOrder } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

export default function Checkout() {
  const { planSlug } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [setting, setSetting] = useState(null);
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    customer_address: "",
    customer_note: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch plan details and settings
    fetch(`${API_BASE_URL}/checkout/${planSlug}`)
      .then((r) => r.json())
      .then((data) => {
        setPlan(data.plan || null);
        setSetting(data.setting || null);
      })
      .catch(() => {});
  }, [planSlug]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      const payload = {
        ...form,
        pricing_plan_id: plan?.id,
        product_id: plan?.get_product?.id,
        pricing_plan_heading: plan?.heading,
        subtotal: plan?.discount_price > 0 ? plan.discount_price : plan?.regular_price,
        total: plan?.discount_price > 0 ? plan.discount_price : plan?.regular_price,
      };
      const data = await postOrder(payload);
      if (data.res_status === 1 || data.order) {
        navigate("/order-confirm", { state: { order: data.order, setting } });
      } else {
        setErrors(
          typeof data.error === "object" ? data.error : { general: data.error }
        );
      }
    } catch {
      setErrors({ general: "Could not place order. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const price =
    plan?.discount_price > 0 ? plan.discount_price : plan?.regular_price;
  const currency = setting?.currency_sign || "";

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
                  Checkout <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Checkout</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 form-section checkout-form mt-5">
                    <div className="form-row">
                      {/* Shipping Info */}
                      <div className="col-md-8 col-12 contact-wrap wrapper p-md-5 p-4">
                        <div className="form-header checkout-header">
                          <h3 className="mb-3">Shipping Info</h3>
                        </div>
                        <div className="form-content">
                          <div className="row">
                            <div className="col-12 mb-4">
                              <input
                                type="text"
                                name="customer_name"
                                className="form-control"
                                placeholder="Full name *"
                                value={form.customer_name}
                                onChange={handleChange}
                                required
                              />
                              {errors.customer_name && (
                                <span style={{ color: "red" }}>
                                  {errors.customer_name[0]}
                                </span>
                              )}
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                              <input
                                type="number"
                                name="customer_phone"
                                className="form-control"
                                placeholder="Phone number *"
                                value={form.customer_phone}
                                onChange={handleChange}
                                required
                              />
                              {errors.customer_phone && (
                                <span style={{ color: "red" }}>
                                  {errors.customer_phone[0]}
                                </span>
                              )}
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                              <input
                                type="email"
                                name="customer_email"
                                className="form-control"
                                placeholder="Email address"
                                value={form.customer_email}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-12 mb-4">
                              <textarea
                                name="customer_address"
                                className="form-control"
                                placeholder="Full address *"
                                rows="2"
                                value={form.customer_address}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                            <div className="col-12 mb-4">
                              <textarea
                                name="customer_note"
                                className="form-control"
                                placeholder="Note"
                                rows="5"
                                value={form.customer_note}
                                onChange={handleChange}
                                required
                              ></textarea>
                            </div>
                            {errors.general && (
                              <div className="col-12 mb-3">
                                <span style={{ color: "red" }}>
                                  {errors.general}
                                </span>
                              </div>
                            )}
                            <div className="col-12 mb-4">
                              <input
                                type="submit"
                                value={submitting ? "Placing…" : "Place Order"}
                                className="btn btn-primary font-weight"
                                disabled={submitting}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Summary */}
                      {plan && (
                        <div className="col-md-4 col-12">
                          <div className="order-summery-card">
                            <h5 className="title">Order Summary</h5>
                            <div className="plan-item">
                              <div className="d-flex justify-content-between">
                                <div className="col-6">
                                  <h5 className="plan-title">
                                    {plan.heading}
                                  </h5>
                                  <h6 className="plan-subtitle">
                                    {plan.sub_heading}
                                  </h6>
                                </div>
                                <div className="col-6">
                                  <h5 className="plan-price">
                                    {currency}{" "}
                                    {Number(price).toFixed(2)}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="plan-pricing">
                              {["Subtotal", "Total"].map((label) => (
                                <div
                                  key={label}
                                  className="d-flex justify-content-between"
                                >
                                  <div className="col-6">
                                    <h5 className="title">{label}</h5>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="plan-price">
                                      {currency} {Number(price).toFixed(2)}
                                    </h5>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
