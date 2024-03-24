import React, { useState } from "react";
import TuxImg from "../../assets/tux.png";
import { TypeAnimation } from "react-type-animation";
import { SendHorizonalIcon } from "lucide-react";
const ChatBot = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const questions = [
        "Hi, This is Tuxi. Are you ready?\n I will guide you through application.",
        "What is your full name?",
        "Which branch are you from?",
        "Please provide your mobile number.",
        "What is your email address?",
        "Share your favorite quote with us.",
        "Why do you want to join this club? Please explain your reasons.",
        "Upload a recent photo of yourself.",
        "Attach your resume in PDF format.",
    ];

    const branches = [
        "CSE",
        "IT",
        "Electronics",
        "Electrical",
        "Mechanical",
        "Civil",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        if (name === "branch") {
            setAnswers({ ...answers, [name]: value });
        } else {
            setAnswers({ ...answers, [questions[step]]: value });
            if (name === "mobile number" && !validatePhoneNumber(value)) {
                errorMessage = "Please provide a valid phone number.";
            } else if (name === "email" && !validateEmail(value)) {
                errorMessage = "Please provide a valid email address.";
            }
            setError(errorMessage);
        }
    };

    const handleNext = () => {
        if (step !== 1 && !answers[questions[step]]) {
            setError("Please fill out this field.");
            return;
        }
        if (step === questions.length - 1) {
            console.log(answers);
            setSuccess(true);
            return;
        }
        setStep(step + 1);
        setError("");
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d+$/;
        return regex.test(phoneNumber);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="w-full h-full flex flex-col justify-between p-6">
            <div className="w-full flex space-x-4 md:space-x-6">
                <div className="w-2/12 h-fit md:w-1/12 aspect-square rounded-full bg-gray-800 p-2">
                    <img src={TuxImg}></img>
                </div>
                <div className="w-9/12 md:w-10/12 rounded-[35px] bg-gray-800 p-6 text-white font-mono font-semibold text-xl">
                    <TypeAnimation
                        sequence={[questions[step], 2000]}
                        wrapper="span"
                        speed={30}
                        style={{ display: "inline-block" }}
                        repeat={Infinity}
                    ></TypeAnimation>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="w-11/12 h-24 flex justify-between ">
                  <input className="w-11/12 bg-gray-800 border border-gray-400 rounded-[35px] outline-none text-xl p-4 text-gray-400" placeholder={"Type here..."}>
                  </input>
                  <button className="py-4 px-8 bg-gray-800 rounded-[30px] border border-gray-400">
                    <SendHorizonalIcon color="white" className="w-10 h-10"/>
                  </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
