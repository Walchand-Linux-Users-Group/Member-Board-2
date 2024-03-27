import React, { useEffect, useRef, useState } from "react";
import TuxImg from "../../assets/tux.png";
import UserImg from "../../assets/user.png";
import questions from "../../Data/questions";
import { Radio, SendHorizonalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../Typewriter/Typewriter";
import Popup from "reactjs-popup";

const ChatBot = () => {
    // For scrolling on every new question
    const tuxRef = useRef(null);

    // For navigation
    const navigate = useNavigate();

    // State variables
    const [step, setStep] = useState(0); // Current question number
    const [currentQuestion, setCurrentQuestion] = useState(questions[step]); // Current question
    const [answers, setAnswers] = useState({}); // Answers given  by user
    const [error, setError] = useState(""); // Error message
    const [answered, setAnswered] = useState([]); // To keep track of answered questions and their responses
    const [isLoading, setIsLoading] = useState(false); // To show loading spinner
    const [success, setSuccess] = useState(false); // To know if the application was successful

    // Function to handle change in input field value (main)
    const handleChange = (e) => {
        setError("");
        // Handling file input
        if (currentQuestion.ansType === "file") {
            setAnswers({
                ...answers,
                [currentQuestion.field]: e.target.files[0],
            });
            console.log(answers);
            return;
        }

        // Handling text input
        setAnswers({ ...answers, [currentQuestion.field]: e.target.value });
    };

    const validate = (currentQuestion, response) => {
        // If the current question is of type options, then check for valid option
        if (currentQuestion.ansType === "options") {
            if (!currentQuestion.options.includes(response)) {
                setError("Please select a valid option.");
                return false;
            }
        }

        // If the current question is of type text or file, then check for constraints
        if (
            currentQuestion.ansType === "text" ||
            currentQuestion.ansType === "file"
        ) {
            if (currentQuestion.ansType === "file") {
                if (currentQuestion.field === "photo" && response) {
                    if (
                        response.type !== "image/jpeg" &&
                        response.type !== "image/png" &&
                        response.type !== "image/jpg"
                    ) {
                        setError(
                            "Please upload a valid image file. (.png, .jpg, .jpeg)"
                        );
                        return false;
                    }
                }
                if (currentQuestion.field === "resume" && response) {
                    if (response.type !== "application/pdf") {
                        setError("Please upload a valid pdf file. (.pdf)");
                        return false;
                    }
                }
            }
            if (currentQuestion.constraints) {
                if (currentQuestion.constraints.required) {
                    if (response === "" || !response) {
                        setError(currentQuestion.constraints.required.message);
                        return false;
                    }
                }
                if (currentQuestion.constraints.pattern) {
                    if (
                        !currentQuestion.constraints.pattern.value.test(
                            response
                        )
                    ) {
                        setError(currentQuestion.constraints.pattern.message);
                        return false;
                    }
                }
                if (currentQuestion.constraints.length) {
                    if (
                        response.length <
                            currentQuestion.constraints.length.min ||
                        response.length > currentQuestion.constraints.length.max
                    ) {
                        setError(currentQuestion.constraints.length.message);
                        return false;
                    }
                }
            }
        }
        return true;
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

        // validate the response
        if (!validate(currentQuestion, answers[currentQuestion.field])) {
            return;
        }

        // Create an object to store the current question and its response
        let curans = {
            question: currentQuestion.title,
            answer:
                currentQuestion.ansType !== "file"
                    ? answers[currentQuestion.field]
                    : answers[currentQuestion.field].name,
            type: currentQuestion.ansType,
            index: step,
            field: currentQuestion.field,
            constraints: currentQuestion.constraints,
        };

        // If the current question is of type text or file, then move to next question
        if (
            currentQuestion.ansType === "text" ||
            currentQuestion.ansType === "file"
        ) {
            document.getElementById(currentQuestion.field).value = "";
        }

        setAnswered([...answered, curans]);
        let cur = step + 1;
        setError("");
        setStep(cur);
        setCurrentQuestion(questions[cur]);
        tuxRef.current.scrollIntoView({ behavior: "smooth" });
    };

    // Function to make a response editable
    const makeEditable = (index) => {
        if (
            answered[index].field === "start" ||
            answered[index].field === "submit" ||
            answered[index].field === "tip" ||
            success ||
            step === questions.length - 1 ||
            isLoading
        ) {
            return;
        }
        document.getElementById(`userres${index}`).classList.toggle("hidden");

        const usered = document.getElementById(`usered${index}`);
        usered.classList.toggle("hidden");
        usered.classList.toggle("flex");
    };

    // Function to handle edit submit button click
    const handleEditSubmit = (index) => {
        // Validate the response
        const validation = validate(
            questions[answered[index].index],
            answers[questions[answered[index].index].field]
        );

        if (!validation) {
            return;
        }

        makeEditable(index);
        console.log(answers);
        console.log(answered);
    };

    // Function to handle apply button click
    const handleApply = async () => {
        // set loading to true
        setIsLoading(true);

        // url to make a POST request
        const url = "https://wlug-mb2-backend.onrender.com/api/user/apply";

        // Create a formData object
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
            if (res.ok) {
                console.log(json);
                setSuccess(true);

                setAnswered([
                    ...answered,
                    { question: currentQuestion.title, answer: "Yes" },
                ]);
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
        setIsLoading(false);
    };

    // Function to handle edit of response (text)
    const handleEdit1 = (e, ind) => {
        setError("");
        const editQuestion = answered[ind];
        setAnswers({
            ...answers,
            [editQuestion.field]: e.target.value,
        });
        const temp = answered;
        temp[ind].answer = e.target.value;
        setAnswered(temp);
    };

    // Function to handle edit of response (file)
    const handleEdit2 = (e, ind) => {
        setError("");
        const editQuestion = answered[ind];
        console.log(e.target.files[0]);
        setAnswers({
            ...answers,
            [editQuestion.field]: e.target.files[0],
        });
        const temp = answered;
        temp[ind].answer = e.target.files[0].name;
        setAnswered(temp);
    };

    // useEffect to scroll to the bottom of the chat on every new question
    useEffect(() => {
        // waiting till keyboard is not closed on mobile
        if (window.innerWidth <= 500) {
            setTimeout(() => {
                tuxRef.current.scrollIntoView({ behavior: "smooth" });
            }, 500);
        } else {
            tuxRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [answered, error, currentQuestion]);

    return (
        <div className="w-full flex justify-center items-center">
            {/* Main container */}
            <div
                id="main-chat-cont"
                className="relative lg:w-4/5 w-11/12 h-[86vh] md:h-[90vh] bg-gray-900 rounded-lg bg-opacity-60"
            >
                <div className="overflow-y-scroll p-6 custom-scrollbar h-[70vh]">
                    {/* Previous or answered questions */}
                    {answered.length > 0 &&
                        answered.map((curque, ind) => {
                            return (
                                <div className="w-full space-y-4 mb-6">
                                    <div className=" max-w-[85%]">
                                        <div className="w-8 h-8 aspect-square rounded-full bg-gray-700 p-1">
                                            <img src={TuxImg}></img>
                                        </div>

                                        <div className="ml-8 space-y-4">
                                            <div className="w-fit rounded-[15px] bg-indigo-700 p-3 md:p-6 text-white  font-medium text-lg">
                                                {curque.question}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className="flex flex-row-reverse">
                                            <div className="w-8 h-8 aspect-square rounded-full bg-gray-700 p-1">
                                                <img src={UserImg}></img>
                                            </div>
                                            <div className="mt-8">
                                                <div
                                                    className="w-fit max-w-[50vw] cursor-pointer bg-[#B557C4] p-3 md:p-6 rounded-[15px] text-white  font-medium text-lg break-words"
                                                    id={`userres${curque.index}`}
                                                    onClick={() =>
                                                        makeEditable(
                                                            curque.index
                                                        )
                                                    }
                                                >
                                                    {curque.answer}
                                                </div>
                                                {/* create a inline input for editing respone */}
                                                <div
                                                    className="hidden w-full rounded-[15px] bg-gray-800 p-3"
                                                    id={`usered${curque.index}`}
                                                >
                                                    {curque.type === "text" ? (
                                                        <input
                                                            className=" w-full rounded-[15px] bg-gray-800 outline-none text-lg p-2 text-gray-400"
                                                            placeholder={
                                                                "Type here..."
                                                            }
                                                            onChange={(e) =>
                                                                handleEdit1(
                                                                    e,
                                                                    ind
                                                                )
                                                            }
                                                            onFocus={(e) => {}}
                                                            autoComplete="off"
                                                        />
                                                    ) : curque.type ===
                                                      "options" ? (
                                                        <Popup
                                                            trigger={
                                                                <div className="rounded-[15px] w-11/12 bg-gray-800 outline-none text-lg p-2 text-gray-400 cursor-pointer ">
                                                                    {
                                                                        answered[
                                                                            ind
                                                                        ].answer
                                                                    }
                                                                </div>
                                                            }
                                                            modal
                                                        >
                                                            {(close) => (
                                                                <div className="bg-gray-800 rounded-lg shadow-lg min-w-[300px] max-h-[300px] overflow-y-auto custom-scrollbar">
                                                                    <div className="">
                                                                        <h1 className="text-lg font-medium text-gray-400 p-4 border-b border-gray-400">
                                                                            Select
                                                                            an
                                                                            option
                                                                        </h1>
                                                                        <div className="space-y-4">
                                                                            {questions[
                                                                                ind
                                                                            ].options.map(
                                                                                (
                                                                                    option,
                                                                                    index
                                                                                ) => (
                                                                                    <div
                                                                                        className="bg-gray-800 text-gray-400 p-3 text-lg  cursor-pointer hover:bg-gray-700 hover:text-gray-300 "
                                                                                        onClick={() => {
                                                                                            setAnswers(
                                                                                                {
                                                                                                    ...answers,
                                                                                                    [questions[
                                                                                                        ind
                                                                                                    ]
                                                                                                        .field]:
                                                                                                        [
                                                                                                            option,
                                                                                                        ],
                                                                                                }
                                                                                            );
                                                                                            const temp =
                                                                                                answered;
                                                                                            temp[
                                                                                                ind
                                                                                            ].answer =
                                                                                                option;
                                                                                            setAnswered(
                                                                                                temp
                                                                                            );
                                                                                            close();
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            option
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Popup>
                                                    ) : (
                                                        <input
                                                            className="w-11/12 rounded-[15px] bg-gray-800 outline-none text-lg p-2 text-gray-400"
                                                            type="file"
                                                            onChange={(e) =>
                                                                handleEdit2(
                                                                    e,
                                                                    ind
                                                                )
                                                            }
                                                            onFocus={(e) => {}}
                                                            accept={
                                                                questions[ind]
                                                                    .field ===
                                                                "photo"
                                                                    ? "image/x-png,image/png,image/jpeg,image/jpg"
                                                                    : "application/pdf"
                                                            }
                                                        />
                                                    )}
                                                    <button
                                                        onClick={(e) =>
                                                            handleEditSubmit(
                                                                ind
                                                            )
                                                        }
                                                    >
                                                        <SendHorizonalIcon
                                                            color="white"
                                                            className="w-6 h-6 "
                                                        ></SendHorizonalIcon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    {/* Current question */}
                    {/* Tux Side */}
                    <div className="w-full space-y-1 mt-4">
                        {/* Tux Image */}
                        <div className="w-8 h-8 aspect-square rounded-full bg-gray-700 p-1">
                            <img src={TuxImg}></img>
                        </div>

                        {/* Tux Conversation */}
                        <div className="ml-8 space-y-4">
                            {/* Message */}
                            <div
                                className="max-w-[85%] w-fit rounded-[15px] bg-indigo-700 p-3 md:p-6 text-white  font-medium text-lg"
                                id="tux-conv"
                            >
                                <Typewriter text={currentQuestion.title} />
                            </div>
                            {/* Error */}
                            {error !== "" ? (
                                <div className="w-fit rounded-[15px] bg-indigo-700 p-3 md:p-6  font-medium text-lg text-red-500">
                                    <Typewriter text={error} id="tux-error" />
                                </div>
                            ) : (
                                <></>
                            )}

                            <div ref={tuxRef}></div>
                        </div>
                    </div>
                </div>

                {/* Current question */}
                {/* User side */}
                <div className="w-full flex p-4 absolute bottom-2">
                    {isLoading ? (
                        <div className="flex w-full border bg-gray-800 border-gray-500 rounded-[15px] p-2 px-4 justify-center space-x-3">
                            <div className="w-16 h-16 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="flex justify-between w-full border bg-gray-800 border-gray-500 rounded-[15px] p-2 px-4">
                            {/* Input field */}
                            {
                                // If the current question is of type file, then show a file input field
                                currentQuestion.ansType === "file" ? (
                                    <input
                                        className="w-11/12 rounded-[15px] bg-gray-800 outline-none text-lg p-4 text-gray-400"
                                        type="file"
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                        accept={
                                            currentQuestion.field === "photo"
                                                ? "image/*"
                                                : ".pdf"
                                        }
                                    />
                                ) : currentQuestion.ansType === "options" ? (
                                    <>
                                        <Popup
                                            trigger={
                                                <div className="rounded-[15px] w-11/12 bg-gray-800 outline-none text-lg p-4 text-gray-400 cursor-pointer ">
                                                    {answers[
                                                        currentQuestion.field
                                                    ] !== "" &&
                                                    answers[
                                                        currentQuestion.field
                                                    ] !== undefined
                                                        ? answers[
                                                              currentQuestion
                                                                  .field
                                                          ]
                                                        : "Select an option"}
                                                </div>
                                            }
                                            modal
                                        >
                                            {(close) => (
                                                <div className="bg-gray-800 rounded-lg shadow-lg min-w-[300px] max-h-[300px] overflow-y-auto custom-scrollbar">
                                                    <div className="">
                                                        <h1 className="text-lg font-medium text-gray-400 p-4 border-b border-gray-400">
                                                            Select an option
                                                        </h1>
                                                        <div className="space-y-4">
                                                            {currentQuestion.options.map(
                                                                (
                                                                    option,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        className="bg-gray-800 text-gray-400 p-3 text-lg  cursor-pointer hover:bg-gray-700 hover:text-gray-300 "
                                                                        onClick={() => {
                                                                            setAnswers(
                                                                                {
                                                                                    ...answers,
                                                                                    [currentQuestion.field]:
                                                                                        option,
                                                                                }
                                                                            );
                                                                            close();
                                                                        }}
                                                                    >
                                                                        {option}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </>
                                ) : (
                                    <input
                                        className="rounded-[15px] w-11/12 bg-gray-800 outline-none text-lg p-4 text-gray-400"
                                        placeholder={"Type here..."}
                                        disabled={
                                            currentQuestion.ansType ===
                                            "options"
                                        }
                                        value={answers[currentQuestion.field]}
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {}}
                                        autoComplete="off"
                                    ></input>
                                )
                            }

                            {/* Next button */}
                            <button
                                onClick={handleNext}
                                className="px-2 rounded-sm bg-gray-800 hover:bg-gray-900"
                            >
                                <SendHorizonalIcon
                                    color="white"
                                    className="w-6 h-6 md:w-10 md:h-10"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
