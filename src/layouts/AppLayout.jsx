import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialButton from "../components/SocialButton";
import { getSetting, getServices, getCategories } from "../api/client";

/**
 * AppLayout – wraps every page.
 * Fetches shared data (settings, services, categories) once and passes
 * it down to Header and Footer via props.
 */
export default function AppLayout() {
  const [setting, setSetting] = useState(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getSetting()
      .then(setSetting)
      .catch(() => {});
    getServices()
      .then(setServices)
      .catch(() => {});
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  //console.log(setting);

  return (
    <>
      <Header setting={setting} services={services} categories={categories} />
      {/* Page content rendered here */}
      <Outlet />
      <Footer setting={setting} services={services} categories={categories} />
      <SocialButton setting={setting} />
      {/* Full-screen loader (matches Blade master) */}
      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle
            className="path-bg"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="4"
            stroke="#eeeeee"
          />
          <circle
            className="path"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="4"
            strokeMiterlimit="10"
            stroke="#F96D00"
          />
        </svg>
      </div>
    </>
  );
}
