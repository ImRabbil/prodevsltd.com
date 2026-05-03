import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../api/client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(setBlogs).catch(() => {});
  }, []);

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
                  Blogs <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Blogs</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Blog list */}
      <section className="ftco-section blog-page">
        <div className="container">
          <div className="row">
            {blogs.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card b_card">
                  <div className="blog_image">
                    <Link to={`/blogs/${item.slug}`}>
                      <img
                        src={assetUrl(item.media?.path)}
                        alt={item.media?.alt_text || item.title}
                      />
                    </Link>
                  </div>
                  <div className="text p-3">
                    <div className="header_text">
                      <div className="cat">
                        {item.get_categories?.map((cat) => (
                          <span key={cat.id} className="badge bg-dark">
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <div className="icon">
                        <span>
                          <i className="fa fa-calendar"></i>{" "}
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="title_text">
                      <Link to={`/blogs/${item.slug}`}>{item.title}</Link>
                    </div>
                    <div
                      className="description text-wrap"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className="custom_button" style={{ marginBottom: 15 }}>
                      <Link to={`/blogs/${item.slug}`}>See More</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
