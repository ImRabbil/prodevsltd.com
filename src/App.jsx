import Header from "./components/Header";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";

function App() {
  const [setting, setSetting] = useState([]);
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetch("http://localhost/prodevsltd.com/public/api/v1/setting")
      .then((res) => res.json())
      .then((data) => setSetting(data));

    fetch("http://localhost/prodevsltd.com/public/api/v1/slider")
      .then((res) => res.json())
      .then((data) => setSlider(data));
  }, []);

  return (
    <>
      <Header settings={setting} />

      <Hero sliders={slider} />
    </>
  );
}

export default App;
