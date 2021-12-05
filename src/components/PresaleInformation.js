import React from "react";

export default function PresaleInformation() {
  return (
    <div>
      <div className="p-5" />
      <div className="presaleinformation">
        <h1 className="title custom-font">Presale Information</h1>
        <ul>
          <li>Presale starts from Nov 25, 2021 (12:00 AM UTC).</li>
          <li>
            Presale ends on Jan 11th, 2021 (12:00 AM UTC). [Subject to change]
          </li>
          <li>Commitment should be done in BUSD.</li>
          <li>There is no minimum amount to commit.</li>
          <li>
            Minimum amount of BUSD to be raised is 20k BUSD. If this goal is not
            met within Presale deadline, all deposits will be refunded.
          </li>
          <li>Maximum amount for an individual is capped at 10k BUSD.</li>
          <li>
            The price at which your commitment will execute depends on the total
            amount raised.
          </li>
          <ul>
            <li>
              If total amount is {`<=`} 25,000 BUSD then price will be $0.025
              per LEMA.
            </li>
            <li>
              If total amount is {`>=`} 25,000 BUSD and {`<=`} 50,000 BUSD then
              price will be determined (between $0.025 and $0.05) via the graph
              below.
            </li>
            <li>
              If total amount is {`>`} 50,000 BUSD then price will be $0.05 per
              LEMA.
            </li>
          </ul>
          <li>
            LEMA token will be claimable after vesting. Date has not been
            finalized. Stay tuned to our dicord channel and twitter for updates.
          </li>
        </ul>

        <div className="text-center">
          <img
            src="/assets/presale_info_1.png"
            className="presaleinfo-image"
            alt="LEMA token price graph"
          />
        </div>
      </div>
    </div>
  );
}
