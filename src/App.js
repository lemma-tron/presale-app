import React, { useState } from "react";
import { BusdInformation } from "./components/BusdInformation";
import ContractInformation from "./components/ContractInformation";
import Header from "./components/Header";
import PresaleAction from "./components/PresaleAction";
import PresaleCountdown from "./components/PresaleCountdown";
import PresaleInformation from "./components/PresaleInformation";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="container">
      <Header />
      <div className="content">
        <PresaleCountdown />
        <PresaleAction address={address} setAddress={setAddress} />
        <BusdInformation />
        <PresaleInformation />
        <ContractInformation />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
