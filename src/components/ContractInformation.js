import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

const bscScanUrl = "https://www.bscscan.com/address/";

export default function ContractInformation() {
  const notifyCopied = () =>
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
    });

  const copyAddress = (e, address) => {
    e.preventDefault();
    navigator.clipboard.writeText(address);
    notifyCopied();
  };

  return (
    <div>
      <div className="p-5" />
      <div className="contractinformation">
        <div className="contract text-center">
          <div className="title">Presale Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"}
              rel="noopener noreferrer"
              target="_blank"
            >
              0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">Presale Vault Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"}
              rel="noopener noreferrer"
              target="_blank"
            >
              0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">LEMA Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"}
              rel="noopener noreferrer"
              target="_blank"
            >
              0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">BUSD Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"}
              rel="noopener noreferrer"
              target="_blank"
            >
              0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
