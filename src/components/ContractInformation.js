import React from "react";
import {
  getPresaleNenAddress,
  getPresaleNenVaultAddress,
  getBUSDAddress,
  getNenTokenAddress,
} from "../libs/addressHelpers";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

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
              href={bscScanUrl + getPresaleNenAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getPresaleNenAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getPresaleNenAddress())}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">Presale Vault Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + getPresaleNenVaultAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getPresaleNenVaultAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getPresaleNenVaultAddress())}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">LEMA Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + getNenTokenAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getNenTokenAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getNenTokenAddress())}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">BUSD Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + getBUSDAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getBUSDAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getBUSDAddress())}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
