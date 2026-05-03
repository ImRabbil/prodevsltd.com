import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetails(slug).then(setProduct).catch(() => {});
  }, [slug]);

  if (!product) {
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
            <div className="col-md-9 ftco-animate">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link to="/">
                    Home <i className="fa fa-chevron-right"></i>
                  </Link>
                </span>{" "}
                <span>
                  Product Details <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">{product.name}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {/* Product image */}
            {product.media?.path && (
              <div className="col-md-5 mb-4">
                <img
                  src={assetUrl(product.media.path)}
                  className="img-fluid"
                  alt={product.media?.alt_text || product.name}
                />
              </div>
            )}

            {/* Product info */}
            <div className={product.media?.path ? "col-md-7" : "col-12"}>
              <h2>{product.name}</h2>
              {product.url && (
                <p>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo
                  </a>
                </p>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description || "",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
