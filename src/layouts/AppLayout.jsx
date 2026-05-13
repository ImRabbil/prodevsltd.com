import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialButton from "../components/SocialButton";
import PageLoader from "../components/PageLoader";
import { useGlobalData } from "../features/shared/hooks/useGlobalData";

export default function AppLayout() {
  const { data, isLoading, isError, refetch } = useGlobalData();

  if (isLoading && !data) {
    return <PageLoader />;
  }

  const setting = data?.setting ?? null;
  const services = data?.services ?? [];
  const categories = data?.categories ?? [];

  return (
    <>
      {isError && (
        <div className="container mt-3">
          <div className="alert alert-warning d-flex justify-content-between align-items-center mb-0">
            <span>Could not load shared site data.</span>
            <button className="btn btn-sm btn-outline-dark" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        </div>
      )}
      <Header setting={setting} services={services} categories={categories} />
      <Outlet />
      <Footer setting={setting} services={services} categories={categories} />
      <SocialButton setting={setting} />
    </>
  );
}
