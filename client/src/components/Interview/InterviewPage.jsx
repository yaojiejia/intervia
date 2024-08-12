import React from 'react';
import { Typography, Box } from '@mui/material';
import profile from './image/profile_1.png';
import QuestionAndAnswer from './QAndA';

const InterviewPage = () => {
    return (
        <Box
            height="100vh"
            sx={{
                display: 'flex',
                margin: 0,
                padding: 0,
                background: 'linear-gradient(135deg, #383121 0%, #383121 40%, #000000 100%)',
            }}
        >
            <QuestionAndAnswer/>
            <Box sx={{height: '100vh', width: '50vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={profile} alt="Profile" style={{ height: '45vh', }}/>
            </Box>
        </Box>
    );
};

export default InterviewPage;