import React, { useRef } from "react";
import { BusdInformation } from "./components/BusdInformation";
import ContractInformation from "./components/ContractInformation";
import Header from "./components/Header";
import PresaleAction from "./components/PresaleAction";
import PresaleCountdown from "./components/PresaleCountdown";
import PresaleInformation from "./components/PresaleInformation";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import useEagerConnect from "./hooks/useEagerConnect";

function App() {
  const busdInformationRef = useRef();

  useEagerConnect();

  return (
    <div id="main" className="container">
      <Header />
      <div className="content">
        <PresaleCountdown />
        <PresaleAction busdInformationRef={busdInformationRef} />
        <BusdInformation ref={busdInformationRef} />
        <PresaleInformation />
        <ContractInformation />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
