import React from "react";
import giphyLogo from "../../assets/giphyLogo.png";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Header() {
  return (
    <header className="e-header">
      <div className="__header-logo">
        <img src={giphyLogo} alt="Header Logo" />
        <h1 className="color-white">GIPHY</h1>
        <span className="color-white text-xxxl">View</span>
      </div>
      <div className="__header-icons">
      <a href="https://github.com/MarcosMurillo/react-giphy-test" target="_blank">
        <FaGithub className="icon-xxxl"/>
      </a>
      <a href="https://github.com/MarcosMurillo/react-giphy-test" target="_blank">
        <FaLinkedinIn className="icon-xxxl"/>
      </a>
      </div>
    </header>
  ); 
}
