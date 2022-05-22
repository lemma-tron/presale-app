import React from "react";

export default function PresaleInformation() {
  return (
    <div>
      <div className="p-5" />
      <div className="presaleinformation">
        <h1 className="title custom-font">Private Sale Information</h1>
        <ul>
          <li>Start Time = May 20, 2022 (12:00 AM UTC).</li>
          <li>
            End Time = May 31, 2022 (12:00 AM UTC). <i>[Subject to change]</i>
          </li>
          <li>Soft Cap = $0</li>
          <li>
            Hard Cap = $450,000 or 600,000,000 LEMA. <br />
            If this goal is not met within the private sale deadline, the
            remaining tokens will be burnt.
          </li>
          <li>Commitment should be done in BUSD.</li>
          <li>There is no minimum or maximum amount to commit.</li>

          {/* <ul>
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
          </ul> */}
          <li>
            Private sale LEMA tokens will be claimable after vesting. See
            schedule in our tokenomics. Stay tuned to our social media for
            updates. Links in the footer.
          </li>
          <li>
            The price at which your commitment will execute depends on the days
            since the start of the presale which is illustrated by the figure
            below:
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
