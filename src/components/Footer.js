import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faTelegram,
  faMediumM,
  faDiscord,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="p-5" />
        <div className="container">
          <div className="row">
            <div className="col-lg-3 footerStartDiv footerStart">
              <div className="logo">
                <img
                  src="/assets/lema_logo.png"
                  className="img-fluid"
                  width="150"
                  alt=""
                ></img>
              </div>
              <div className="socialLinks">
                <ul>
                  <li>
                    <a
                      href="https://twitter.com/lemma_tron"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li style={{ marginLeft: "10px" }}>
                    <a
                      href="https://t.me/lemmatron_tg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faTelegram} />
                    </a>
                  </li>
                  <li style={{ marginLeft: "10px" }}>
                    <a
                      href="https://discord.gg/XnuWPY4kQT"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faDiscord} />
                    </a>
                  </li>
                  <li style={{ marginLeft: "10px" }}>
                    <a
                      href="https://www.linkedin.com/company/lemmatron"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>
                  <li style={{ marginLeft: "10px" }}>
                    <a
                      href="https://lemmatron.medium.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faMediumM} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="copyRightArea">
          <div className="container">
            <div className="row">
              <div className="col-12 textcenter">
                <span>&copy; Copyright All rights reserved 2021.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
