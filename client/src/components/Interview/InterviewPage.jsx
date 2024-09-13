import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

import QuestionAndAnswer from './QAndA';
import ChatComponent from './AIDictation';
import Meeting from './Meeting';

import profile from './image/profile_1.png';
import faviconImage from './image/favicon.png';

const InterviewPage = () => {
    const [clientMsg, setClientMsg] = useState('');
    const updateClientMsg = (newMsg) => {
        setClientMsg(newMsg);
    };

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
            <Meeting clientMsg={clientMsg} updateClientMsg={updateClientMsg} />
            <Box sx={{display: 'flex', flexDirection: 'column', borderLeft: '3px solid #685A4A'}}>
                <Box sx={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={faviconImage} alt="Favicon" style={{ height: '25vh' }}/>
                </Box>
                <ChatComponent clientMsg={clientMsg} />
            </Box>
        </Box>
    );
};

export default InterviewPage;