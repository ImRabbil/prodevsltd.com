import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./layouts/AppLayout";
import PageLoader from "./components/PageLoader";
import ErrorBoundary from "./components/feedback/ErrorBoundary";
import GlobalNetworkBar from "./components/feedback/GlobalNetworkBar";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Career = lazy(() => import("./pages/Career"));
const CareerDetails = lazy(() => import("./pages/CareerDetails"));
const Projects = lazy(() => import("./pages/Projects"));
const Team = lazy(() => import("./pages/Team"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirm = lazy(() => import("./pages/OrderConfirm"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <GlobalNetworkBar />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/services/:slug" element={<ServiceDetails />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:slug" element={<BlogDetails />} />
              <Route path="/career" element={<Career />} />
              <Route path="/career/:slug" element={<CareerDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/team" element={<Team />} />
              <Route path="/products/:categorySlug" element={<Products />} />
              <Route
                path="/products/:categorySlug/:slug"
                element={<ProductDetails />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/checkout/:planSlug" element={<Checkout />} />
              <Route path="/order-confirm" element={<OrderConfirm />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
