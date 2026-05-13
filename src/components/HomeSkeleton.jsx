// components/skeletons/HomeSkeleton.jsx

export default function HomeSkeleton() {
  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          height: "100vh",
          background: "#f1f1f1",
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-md-6">
              <div
                style={{
                  height: "400px",
                  background: "#e0e0e0",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div className="col-md-6">
              <div
                style={{
                  width: "150px",
                  height: "20px",
                  background: "#ddd",
                  marginBottom: "20px",
                  borderRadius: "5px",
                }}
              ></div>

              <div
                style={{
                  width: "100%",
                  height: "60px",
                  background: "#ddd",
                  marginBottom: "20px",
                  borderRadius: "5px",
                }}
              ></div>

              <div
                style={{
                  width: "80%",
                  height: "20px",
                  background: "#ddd",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              ></div>

              <div
                style={{
                  width: "60%",
                  height: "20px",
                  background: "#ddd",
                  marginBottom: "30px",
                  borderRadius: "5px",
                }}
              ></div>

              <div
                style={{
                  width: "180px",
                  height: "50px",
                  background: "#ddd",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container py-5">
        <div className="row">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="col-md-3 mb-4">
              <div
                style={{
                  height: "250px",
                  background: "#eee",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="container py-5">
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="col-md-4 mb-4">
              <div
                style={{
                  height: "300px",
                  background: "#eee",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
