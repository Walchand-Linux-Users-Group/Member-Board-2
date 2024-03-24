import React from "react";
import { WavyBackground } from "../../ui/wavy-back";
import Title from "../../Components/Title/Title";
import Enroll from "../../Components/Enroll/Enroll";
import Info from "../../Components/Information/Info"
import Tux from "../../Components/Tux/Tux"
import "./home.css"

const HomePage = () => {
    return (
        <div>
            <div className="homeboday">
                <div className="min-h-screen w-screen">
                    <div className="center">
                        <a
                            href="https://www.wcewlug.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="logo"
                                src="/Logo_White.png"
                                alt="Logo"
                            />
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
                <div className="Back">
                    <WavyBackground />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
