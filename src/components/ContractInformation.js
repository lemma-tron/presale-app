import React from "react";
import {
  getPresaleLemaAddress,
  getPresaleLemaVaultAddress,
  getBUSDAddress,
  getLemaTokenAddress,
} from "../libs/addressHelpers";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const bscBaseUrl = process.env.REACT_APP_BSC_URL;
const bscScanUrl = `${bscBaseUrl}/address/`;

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
              href={bscScanUrl + getPresaleLemaAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getPresaleLemaAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getPresaleLemaAddress())}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">Presale Vault Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + getPresaleLemaVaultAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getPresaleLemaVaultAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getPresaleLemaVaultAddress())}
            />
          </div>
        </div>
        <div className="contract text-center">
          <div className="title">LEMA Contract Address</div>
          <div className="address">
            <a
              href={bscScanUrl + getLemaTokenAddress()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {getLemaTokenAddress()}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy_address"
              onClick={(e) => copyAddress(e, getLemaTokenAddress())}
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
