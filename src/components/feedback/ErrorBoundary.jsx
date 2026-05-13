import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return (
        <section className="ftco-section">
          <div className="container">
            <h3>Something went wrong.</h3>
            <p>{error?.message || "Please refresh and try again."}</p>
          </div>
        </section>
      );
    }

    return children;
  }
}
