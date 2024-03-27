import React from "react";
import "./enroll.css";
import { FaInstagram, FaLinkedin, FaDiscord, FaTwitter } from "react-icons/fa"; // Import icons as needed
import { MovingBorderDemo } from "../../ui/btnDemo";
import { useNavigate } from "react-router-dom";

export default function Enroll({ onClick }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="main mt-5">
        <MovingBorderDemo
          onClick={() => {navigate("/register") }}
          text={"Enroll"}
        />
        <div className="links">
          <a href="https://www.instagram.com/wcewlug/" target="_blank" rel="noopener noreferrer">
            <FaInstagram  size={"30px"}   /> {/* Replace text with Instagram icon */}
          </a>
          <a href="https://www.linkedin.com/company/wlug-club/mycompany/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin  size={"30px"}  /> {/* Replace text with LinkedIn icon */}
          </a>
          <a href="https://discord.wcewlug.org/join" target="_blank" rel="noopener noreferrer">
            <FaDiscord  size={"30px"}  /> {/* Replace text with Discord icon */}
          </a>
          <a href="https://twitter.com/wcewlug" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={"30px"}   /> {/* Replace text with Twitter icon */}
          </a>
        </div>
      </div>
    </>
  );
}
