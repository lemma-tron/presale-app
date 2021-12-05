import React from "react";

export const BusdInformation = () => {
  const isRefunding = false;

  return (
    <div>
      <div className="p-3" />
      <div className="busdinformation text-center">
        <div className="busdinformation-content-1">
          <div className="busdcount">
            <div>Total BUSD deposited</div>
            <div className="custom-font token-count">0</div>
            <div>(Min Goal: 20k)</div>
          </div>
          <hr />
          <div className="lemacount">
            <div>Total LEMA to be distributed</div>
            <div className="custom-font token-count">0</div>
            <div>LEMA claimed: 0</div>
          </div>
        </div>

        <div className="busdinformation-content-2">
          <div className="row busdcount alignitems-center">
            <div className="col-7">
              Your BUSD deposit: <br /> (Max 10,000)
            </div>
            <div className="col-5 custom-font token-count-personal">0</div>
          </div>
          <div className="row lemacount alignitems-center">
            <div className="col-7">LEMA to claim: </div>
            <div className="col-5 custom-font token-count-personal">0</div>
          </div>
          <div>
            {isRefunding ? (
              <button
                className="btn btn-outline-light claim-button"
                type="button"
                disabled={false}
              >
                <span>Refund BUSD</span>
              </button>
            ) : (
              <button
                className="btn btn-outline-light claim-button"
                type="button"
                disabled={false}
              >
                <span>Claim LEMA</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
