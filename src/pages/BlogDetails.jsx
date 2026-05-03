import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogDetails } from "../api/client";

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

function shareUrl(type, url) {
  const encoded = encodeURIComponent(url);
  if (type === "facebook")
    return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
  if (type === "twitter")
    return `http://twitter.com/intent/tweet?url=${encoded}`;
  if (type === "linkedin")
    return `http://www.linkedin.com/shareArticle?mini=true&url=${encoded}`;
  return "#";
}

function openShare(url) {
  const left = window.screen.width / 2 - 400;
  const top = window.screen.height / 2 - 300;
  window.open(url, "pop", `width=800,height=600,scrollbars=no,top=${top},left=${left}`);
}

export default function BlogDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getBlogDetails(slug).then(setData).catch(() => {});
  }, [slug]);

  if (!data) {
    return (
      <section className="ftco-section">
        <div className="container">
          <p>Loading…</p>
        </div>
      </section>
    );
  }

  const { blog, blogs: recentBlogs = [], categories = [], category_array = [] } = data;
  const pageUrl = window.location.href;

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
                  Blog Details <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">{blog.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {/* Main */}
            <div className="col-md-8 mb-4">
              <div className="d_title_text">{blog.title}</div>
              {blog.media?.path && (
                <div className="d_blog_image">
                  <img
                    src={assetUrl(blog.media.path)}
                    alt={blog.media?.alt_text || blog.title}
                  />
                </div>
              )}
              <div className="d_text">
                <div className="d_header_text d-flex justify-content-between">
                  <span>
                    {blog.get_categories?.map((cat) => (
                      <span
                        key={cat.id}
                        className="badge bg-dark"
                        style={{
                          color: "#fff",
                          padding: ".25rem .45rem",
                          fontWeight: 600,
                          borderRadius: ".25rem",
                          fontSize: "0.75em",
                        }}
                      >
                        {cat.name}
                      </span>
                    ))}
                  </span>
                  <span>
                    <i className="fa fa-calendar"></i>{" "}
                    {formatDate(blog.created_at)}
                  </span>
                  <div className="d-flex align-items-center">
                    <ul className="ftco-footer-social list-unstyled mt-md-5">
                      {["facebook", "twitter", "linkedin"].map((type) => (
                        <li key={type}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              openShare(shareUrl(type, pageUrl));
                            }}
                          >
                            <span className={`fa fa-${type}`}></span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="d_description text-wrap m-0"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
                <div>
                  <b>Tags: </b>
                  {blog.get_tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="badge bg-dark"
                      style={{
                        color: "#fff",
                        padding: ".25rem .45rem",
                        fontWeight: 600,
                        borderRadius: ".25rem",
                        fontSize: "0.75em",
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-4 mb-4">
              <div className="row">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="col-md-12">
                    <div
                      className="card d_card custom-card"
                      style={{ border: "none", marginTop: 0 }}
                    >
                      <div className="custom_container">
                        <ul className="category-ul">
                          {categories.map((cat) => (
                            <li key={cat.id}>
                              <a
                                href="#"
                                className={
                                  category_array.includes(cat.id)
                                    ? "active"
                                    : ""
                                }
                              >
                                {cat.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Blogs */}
                {recentBlogs.length > 0 && (
                  <div className="col-md-12">
                    <div className="card d_card custom-card">
                      <div className="card-header custom-header">
                        Recent Blog
                      </div>
                      <div className="custom_container_r">
                        {recentBlogs.map((b, idx) => (
                          <div key={b.id} className="item">
                            <div className="row">
                              <div className="col-md-5 pr-0">
                                <div className="blog_image">
                                  <img
                                    src={assetUrl(b.media?.path)}
                                    alt={b.media?.alt_text || b.title}
                                  />
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div className="text test">
                                  <div className="title_text">
                                    <Link to={`/blogs/${b.slug}`}>
                                      {b.title}
                                    </Link>
                                  </div>
                                </div>
                                <div className="create_date">
                                  {formatDate(b.created_at)}
                                </div>
                              </div>
                            </div>
                            {idx < recentBlogs.length - 1 && <hr />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
