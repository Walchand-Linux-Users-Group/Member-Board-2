import React from "react";
import { WavyBackground } from "../../ui/wavy-backSRC";
import Title from "../../Components/Title/Title";
import Enroll from "../../Components/Enroll/Enroll";
import Info from "../../Components/Information/Info";
import Tux from "../../Components/Tux/Tux";
import "./home.css";

const HomePage = () => {
  return (
    <div className="over">
      <div className="h-screen w-screen flex flex-col">
        <div className="center">
          <a
            href="https://www.wcewlug.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="logo" src="/Logo_White.png" alt="Logo" />
          </a>
        </div>
        <div className="maincon">
          <div className="seccon">
            <Title />
            <Info />
            <Enroll />
          </div>
          <Tux />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
