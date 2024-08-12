// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

import StartInterviewButton from './components/Start/StartBox';
import CustomJobDropdown from './components/PreInterview/JobType';
import CustomQuestionDropdown from "./components/PreInterview/QuestionType";
import QuestionAndAnswer from './components/Interview/QAndA';
import FeedbackInterface from './components/Feedback/FeedbackRate';
import Commend from './components/Feedback/Comment';

import StartPage from "./components/Start/StartPage";
import PreInterviewPage from "./components/PreInterview/PreInterviewPage";
import InterviewPage from "./components/Interview/InterviewPage";
import FeedbackPage from "./components/Feedback/FeedbackPage";

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                {/* <h1>Hello World</h1>
                <Link to="about">About Us</Link>
                <button onClick={() => {
                  fetch("/api")
                    .then((res) => res.text())
                    .then((res) => alert(res));
                }}>CALL THE API</button> */}

                {/* <StartInterviewButton/> */}

                {/* <CustomJobDropdown/> */}
                {/* <CustomQuestionDropdown/> */}

                {/* <FeedbackInterface/> */}
                {/* <Commend/> */}

                {/* <QuestionAndAnswer/> */}
            </div>
        ),
    },
    // {
    //     path: "about",
    //     element: <div>About</div>,
    // },
    {
        path: "start",
        element: (
            <StartPage/>
        )
    },
    {
        path: "preinterview",
        element: (
            <PreInterviewPage/>
        )
    },
    {
        path: "interview",
        element: (
            <InterviewPage/>
        )
    },
    {
        path: "feedback",
        element: (
            <FeedbackPage/>
        )
    }
]);

createRoot(document.getElementById("root")).render(
    <div>
        <CssBaseline />
        <RouterProvider router={router} />
    </div>
);