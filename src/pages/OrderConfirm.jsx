import { useLocation, Link } from "react-router-dom";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export default function OrderConfirm() {
  const { state } = useLocation();
  const order = state?.order || null;
  const setting = state?.setting || {};
  const currency = setting?.currency_sign || "";

  return (
    <section className="order-confirm-section">
      <div className="container order-confirm-container">
        <div className="container-card order-card">
          <div className="order-success-msg">
            <div className="success-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-check icon"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </div>
            <div className="success-text">
              <h2>Order Successfully Placed.</h2>
            </div>
          </div>

          {order && (
            <div className="order-details">
              <h2 className="order-details-title">Order Summary</h2>
              <div className="order-details-content">
                <ul>
                  <li>
                    <p className="text-1">Invoice number:</p>
                    <p className="text-2">
                      <strong>{order.invoice_id}</strong>
                    </p>
                  </li>
                  <li>
                    <p className="text-1">Date:</p>
                    <p className="text-2">
                      <strong>{formatDate(order.order_date)}</strong>
                    </p>
                  </li>
                  <li>
                    <p className="text-1">Sub Total:</p>
                    <p className="text-2">
                      <strong>
                        {currency} {Number(order.subtotal).toFixed(2)}
                      </strong>
                    </p>
                  </li>
                  <li>
                    <p className="text-1">Total:</p>
                    <p className="text-2">
                      <strong>
                        {currency} {Number(order.total).toFixed(2)}
                      </strong>
                    </p>
                  </li>
                  <li>
                    <p className="text-1">Payment method:</p>
                    <p className="text-2">
                      <strong>Cash On Delivery</strong>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
