import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export default function Products() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getProducts(categorySlug)
      .then((data) => {
        // API may return { products, category } or just an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts(data.products || []);
          setCategory(data.category || null);
        }
      })
      .catch(() => {});
  }, [categorySlug]);

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
                  Products <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">
                {category?.name || "Products"}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="ftco-section ftco-portfolio">
        <div className="container">
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="col-md-3 col-sm-6 mb-5">
                  <div className="product-item">
                    <div className="product-image-container">
                      <div
                        className="product-image"
                        style={{
                          backgroundImage: `url(${assetUrl(product.media?.path) || "/assets/images/placeholder.jpg"})`,
                        }}
                      ></div>
                      <div className="product-overlay">
                        <Link
                          to={`/products/${categorySlug}/${product.slug}`}
                          className="btn-custom btn-details"
                        >
                          Details
                        </Link>
                        {product.url && (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-custom btn-demo"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="product-content">
                      <span className="product-category">
                        {category?.name}
                      </span>
                      <h3 className="product-name">
                        <Link to={`/products/${categorySlug}/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <div className="product-footer">
                        <Link
                          to={`/products/${categorySlug}/${product.slug}`}
                          className="view-link"
                        >
                          View Product{" "}
                          <i className="fa fa-long-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h3 className="text-muted">
                  No products found in this category.
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
