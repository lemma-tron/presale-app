import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <img
        className="navbar-brand"
        src="/assets/lema_logo.png"
        width="120px"
        alt="Lemmatron Logo"
      />
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMenu"
        aria-controls="navbarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>
          <FontAwesomeIcon icon={faBars} className="navbar-icon" />
        </span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarMenu"
      >
        <div className="navbar-nav"></div>
        <div className="navbar-nav">
          <a
            className="nav-item nav-link"
            href="https://www.lemmatron.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Official Site
          </a>
          <a
            className="nav-item nav-link"
            href="https://www.lemmatron.com/assets/whitepaper/whitepaper(v2).pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Whitepaper (v2)
          </a>
        </div>
      </div>
    </nav>
  );
}
