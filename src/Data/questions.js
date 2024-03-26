export default [
    {
        title: "Hola Amigo, This is Tuxi. I will guide you through the application process. Are you ready? 🔥",
        ansType: "options",
        options: ["Yes"],
        nextStep: [1],
        constraints: [],
        field: "start",
    },
    {
        title: "What is your full name?",
        ansType: "text",
        nextStep: 2,
        constraints: {
            length: {
                min: 3,
                max: 50,
                message: "Please provide a valid name. (3-50 characters)",
            },
            required: {
                value: true,
                message: "Please provide your name.",
            },
        },
        field: "fullName",
    },
    {
        title: "If you wish to make edits, simply click on the chat bubble containing the text you want to modify.",
        ansType: "options",
        options: ["Ok"],
        nextStep: [1],
        constraints: [],
        field: "tip",
    },
    {
        title: "Which branch are you from?",
        ansType: "options",
        options: [
            "CSE",
            "IT",
            "Electronics",
            "Electrical",
            "Mechanical",
            "Civil",
        ],
        nextStep: 3,
        constraints: {
            required: {
                value: true,
                message: "Please select your branch.",
            },
        },
        field: "branch",
    },
    {
        title: "Please provide your mobile number.",
        ansType: "text",
        nextStep: 4,
        constraints: {
            required: {
                value: true,
                message: "Please provide your mobile number.",
            },
            pattern: {
                value: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
                message: "Please provide a valid mobile number.",
            },
        },
        field: "mobileNo",
    },
    {
        title: "What is your email address?",
        ansType: "text",
        nextStep: 5,
        constraints: {
            required: {
                value: true,
                message: "Please provide your email address.",
            },

            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please provide a valid email address.",
            },
        },
        field: "email",
    },

    {
        title: "Upload a recent photo of yourself.",
        ansType: "file",
        nextStep: 8,
        constraints: {
            required: {
                value: true,
                message: "Please upload your photo.",
            },
        },
        field: "photo",
    },
    {
        title: "Attach your resume in PDF format.",
        ansType: "file",
        nextStep: 9,
        constraints: {
            required: {
                value: true,
                message: "Please upload your resume.",
            },
        },
        field: "resume",
    },
    {
        title: "Share your favourite quote with us.",
        ansType: "text",
        nextStep: 6,
        constraints: {
            required: {
                value: true,
                message: "Please provide your favourite quote.",
            },
            length: {
                min: 5,
                max: 100,
                message: "Please provide a valid quote. (10-100 characters)",
            },
        },
        field: "favoriteQuote",
    },
    {
        title: "Why do you want to join this club?",
        ansType: "text",
        nextStep: 7,
        constraints: {
            required: {
                value: true,
                message: "Please provide your reasons.",
            },
            length: {
                min: 50,
                max: 500,
                message: "Please provide a valid reason. (50-500 characters)",
            },
        },
        field: "whyJoinClub",
    },
    {
        title: "Do you want to submit your application? (Check all the details before submitting) 🧐",
        ansType: "options",
        options: ["Yes"],
        nextStep: [10],
        constraints: [],
        field: "submit",
    },
    {
        title: "Thank you for applying. Your application has been submitted. Hope to see you soon at the interviews! 🐧",
        ansType: "text",
        nextStep: 0,
        constraints: [],
        field: "end",
    },
];