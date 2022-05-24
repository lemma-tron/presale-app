import React from "react";

export default function PresaleInformation() {
  return (
    <div>
      <div className="p-5" />
      <div className="presaleinformation">
        <h1 className="title custom-font">Private Sale Information</h1>
        <ul>
          <li>Start Time = May 25, 2022 (12:00 AM UTC).</li>
          <li>End Time = May 30, 2022 (12:00 AM UTC).</li>
          <li>Soft Cap = $0</li>
          <li>
            Hard Cap = 600,000,000 LEMA. <br />
            <i>
              The remaining tokens will be allocation for the seed round
              funding.
            </i>
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
            schedule in our tokenomics{" "}
            <a
              href="https://www.lemmatron.com/assets/images/tokenomics.png"
              target="_blank"
              rel="noreferrer"
            >
              <u>here</u>
            </a>
            .
          </li>
          <li>
            The price at which your commitment executes depends on the time
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
