import React, { useRef, useState } from "react";
import { BusdInformation } from "./components/BusdInformation";
import ContractInformation from "./components/ContractInformation";
import Header from "./components/Header";
import PresaleAction from "./components/PresaleAction";
import PresaleCountdown from "./components/PresaleCountdown";
import PresaleInformation from "./components/PresaleInformation";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";

function App() {
  const [account, setAccount] = useState("");
  const busdInformationRef = useRef();

  return (
    <div id="main" className="container">
      <Header />
      <div className="content">
        <PresaleCountdown />
        <PresaleAction
          account={account}
          setAccount={setAccount}
          busdInformationRef={busdInformationRef}
        />
        <BusdInformation account={account} ref={busdInformationRef} />
        <PresaleInformation />
        <ContractInformation />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
