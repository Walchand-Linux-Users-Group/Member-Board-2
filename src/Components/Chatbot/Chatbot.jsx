import React, { useState } from "react";
import TuxImg from "../../assets/tux.png";
import questions from "../../Data/questions";
import { ArrowLeft, SendHorizonalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../Typewriter/Typewriter";


const ChatBot = () => {
    // For navigation
    const navigate = useNavigate();

    // To Home
    const toHome = () => {
        navigate("/");
    };

    // State variables
    const [step, setStep] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[step]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Function to handle change in input fields
    const handleChange = (e) => {
        setError("");
        if (currentQuestion.ansType === "file") {
            setAnswers({
                ...answers,
                [currentQuestion.field]: e.target.files[0],
            });
            console.log(answers);
            return;
        }
        setAnswers({ ...answers, [currentQuestion.field]: e.target.value });
        console.log(answers);
    };

    // Function to handle next button click
    const handleNext = () => {
        // If the current question is of type submit, then call handleApply function
        if (currentQuestion.field === "submit") {
            handleApply();
            return;
        }

        // If the current question is of type end, then navigate to home
        if (step === questions.length - 1) {
            navigate("/");
        }

        // If the current question is of type options, then check for valid option
        if (currentQuestion.ansType === "options") {
            if (
                !currentQuestion.options.includes(
                    document.getElementById(currentQuestion.field).value
                )
            ) {
                setError("Please select a valid option.");
                return;
            }
        }

        // If the current question is of type text or file, then check for constraints
        if (
            currentQuestion.ansType === "text" ||
            currentQuestion.ansType === "file"
        ) {
            if (currentQuestion.constraints) {
                if (currentQuestion.constraints.required) {
                    if (
                        answers[currentQuestion.field] === "" ||
                        !answers[currentQuestion.field]
                    ) {
                        setError(currentQuestion.constraints.required.message);
                        return;
                    }
                }
                if (currentQuestion.constraints.pattern) {
                    if (
                        !currentQuestion.constraints.pattern.value.test(
                            document.getElementById(currentQuestion.field).value
                        )
                    ) {
                        setError(currentQuestion.constraints.pattern.message);
                        return;
                    }
                }
                if (currentQuestion.constraints.length) {
                    if (
                        document.getElementById(currentQuestion.field).value
                            .length < currentQuestion.constraints.length.min ||
                        document.getElementById(currentQuestion.field).value
                            .length > currentQuestion.constraints.length.max
                    ) {
                        setError(currentQuestion.constraints.length.message);
                        return;
                    }
                }
            }
        }

        // If the current question is of type text or file, then move to next question
        let cur = step + 1;
        setError("");
        setStep(cur);
        setCurrentQuestion(questions[cur]);
        document.getElementById(currentQuestion.field).value = "";
    };

    // Function to handle apply button click
    const handleApply = async () => {
        const url = "https://wlug-mb2-backend.onrender.com/api/user/apply";
        const formData = new FormData();

        // Append all answers to formData
        for (const key in answers) {
            formData.append(key, answers[key]);
        }

        try {
            // Make a POST request to the server
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const json = await res.json();
            if (res.success) {
                setSuccess(true);
                let cur = step + 1;
                setError("");
                setStep(cur);
                setCurrentQuestion(questions[cur]);
            } else {
                setError(json.error);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };
    return (
        <div className="w-full space-y-4">
            {/* Main container */}
            <div className="w-full flex flex-col justify-between p-6 min-h-[95vh] md:h-[70vh] md:min-h-[70vh] bg-gray-900 rounded-lg bg-opacity-60">
                {/* Tux Side */}
                <div className="w-full flex space-x-4 md:space-x-6">
                    {/* Tux Image */}
                    <div className="w-2/12 h-fit md:w-1/12 aspect-square rounded-full bg-gray-800 p-2">
                        <img src={TuxImg}></img>
                    </div>

                    {/* Tux Conversation */}
                    <div className="w-9/12 md:w-10/12 space-y-4">
                        {/* Message */}
                        <div className="min-h-24 w-full rounded-[35px] bg-gray-800 p-6 text-white font-mono font-semibold text-xl">
                            <Typewriter text={currentQuestion.title} />
                        </div>
                        {/* Error */}
                        {error !== "" ? (
                            <div className="min-h-20 w-full rounded-[35px] bg-gray-800 p-6 font-mono font-semibold text-xl text-red-500">
                                <Typewriter text={error} />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {/* User side */}
                <div className="w-full flex justify-end">
                    <div className="w-full space-y-6">
                        {/* if options show options */}
                        {currentQuestion.ansType === "options" ? (
                            <div className="md:ml-28 w-fit grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                                {currentQuestion.options.map(
                                    (option, index) => (
                                        <button
                                            key={index}
                                            className="text-gray-400 min-w-32 max-w-48 p-4 bg-gray-800 rounded-[30px] border border-gray-400 hover:bg-gray-900 text-lg"
                                            onClick={(e) => {
                                                setError("");
                                                setAnswers({
                                                    ...answers,
                                                    [currentQuestion.field]:
                                                        option,
                                                });
                                            }}
                                        >
                                            {option}
                                        </button>
                                    )
                                )}
                            </div>
                        ) : (
                            <></>
                        )}

                        {/* Laptop input of users*/}
                        <div className="hidden md:flex w-full justify-between space-x-4">
                            {/* Back button */}
                            <button
                                onClick={(e) => {
                                    if (step > 0 && !success) {
                                        let cur = step - 1;
                                        setError("");
                                        setStep(cur);
                                        setCurrentQuestion(questions[cur]);
                                    }
                                }}
                                className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[30px] border border-gray-400 hover:bg-gray-900 "
                            >
                                <ArrowLeft
                                    color="white"
                                    className="w-6 h-6 md:w-10 md:h-10"
                                />
                            </button>

                            {/* Input field */}
                            {
                                // If the current question is of type file, then show a file input field
                                currentQuestion.ansType === "file" ? (
                                    <input
                                        className="h-16 md:h-24 w-11/12 bg-gray-800 border border-gray-400 rounded-[35px] outline-none text-xl p-4 text-gray-400"
                                        type="file"
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                    />
                                ) : (
                                    <input
                                        className="h-16 md:h-24 w-11/12 bg-gray-800 border border-gray-400 rounded-[35px] outline-none text-xl p-4 text-gray-400"
                                        placeholder={"Type here..."}
                                        disabled={
                                            currentQuestion.ansType ===
                                            "options"
                                        }
                                        value={answers[currentQuestion.field]}
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                        autoComplete="off"
                                    ></input>
                                )
                            }

                            {/* Next button */}
                            <button
                                onClick={handleNext}
                                className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[30px] border border-gray-400 hover:bg-gray-900"
                            >
                                <SendHorizonalIcon
                                    color="white"
                                    className="w-6 h-6 md:w-10 md:h-10"
                                />
                            </button>
                        </div>
                        {/* Mobile input  */}
                        <div className=" md:hidden w-full space-y-3">
                            {/* Input field */}
                            {
                                // If the current question is of type file, then show a file input field
                                currentQuestion.ansType === "file" ? (
                                    <input
                                        className="h-16 md:h-24 w-full bg-gray-800 border border-gray-400 rounded-[15px] outline-none text-xl p-4 text-gray-400"
                                        type="file"
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                    />
                                ) : (
                                    <input
                                        className="h-16 md:h-24 w-full bg-gray-800 border border-gray-400 rounded-[15px] outline-none text-xl p-4 text-gray-400"
                                        placeholder={"Type here..."}
                                        disabled={
                                            currentQuestion.ansType ===
                                            "options"
                                        }
                                        value={
                                            answers[currentQuestion.field] || ""
                                        }
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                        autoComplete="off"
                                        type={
                                            currentQuestion.ansType === "file"
                                                ? "file"
                                                : "text"
                                        }
                                    ></input>
                                )
                            }
                            <div className="flex justify-between ">
                                {/* Back Button */}
                                <button
                                    onClick={(e) => {
                                        if (step > 0 && !success) {
                                            let cur = step - 1;
                                            setError("");
                                            setStep(cur);
                                            setCurrentQuestion(questions[cur]);
                                        }
                                    }}
                                    className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[15px] border border-gray-400 hover:bg-gray-900"
                                >
                                    <ArrowLeft
                                        color="white"
                                        className="w-8 h-8 md:w-10 md:h-10"
                                    />
                                </button>
                                {/* Next Button */}
                                <button
                                    onClick={handleNext}
                                    className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[15px] border border-gray-400 hover:bg-gray-900"
                                >
                                    <SendHorizonalIcon
                                        color="white"
                                        className="w-8 h-8 md:w-10 md:h-10"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
