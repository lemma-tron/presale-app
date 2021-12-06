import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import ConnectWalletButton from "./ConnectWalletButton";

export default function PresaleAction() {
  const isApproved = false;

  return (
    <div className="presaleaction">
      <div className="p-3" />
      <div className="row alignitems-center">
        <div className="col-md-3">
          <div className="presalewallet">
            <ConnectWalletButton />
          </div>
        </div>
        <div className="col-md-9 presaledeposit">
          <div className="current-lema-rate">
            Current Price 1 BUSD ≈ 40 LEMA
          </div>
          <div className="row alignitems-center presaleaction-card">
            <div className="col-md-9 presale-transaction">
              <div className="row alignitems-center">
                <div className="col-md-5">
                  <div className="input-group">
                    <span>
                      <img src="/assets/coin-busd.png" alt="busd-coin" />
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      className="frm form-control busd-input"
                      aria-label="busd-amount"
                      aria-describedby="busd-amount"
                      name="busd"
                      min="0"
                      max="10000"
                    />
                    <span>BUSD</span>
                  </div>
                </div>
                <div className="col-md-2 text-center exchange-icon-div">
                  <FontAwesomeIcon
                    icon={faExchangeAlt}
                    className="exchange-icon"
                  />
                </div>
                <div className="col-md-5">
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="0"
                      className="frm form-control lema-input"
                      aria-label="lema-amount"
                      aria-describedby="lema-amount"
                      name="lema"
                      value={0}
                      disabled
                    />
                    <span>LEMA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              {isApproved ? (
                <button
                  className="btn btn-outline-light buy-button"
                  type="button"
                  disabled={false}
                >
                  <span>Deposit BUSD</span>
                </button>
              ) : (
                <button
                  className="btn btn-outline-light buy-button"
                  type="button"
                  disabled={false}
                >
                  <span>Approve BUSD</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
