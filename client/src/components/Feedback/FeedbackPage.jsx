import React from 'react';
import { Typography, Box } from '@mui/material';
import Commend from './Comment';
import FeedbackInterface from './FeedbackRate';

const FeedbackPage = () => {
    return (
        <Box
            height="100vh"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
                background: 'linear-gradient(135deg, #383121 0%, #383121 40%, #000000 100%)',
            }}
        >
            <FeedbackInterface/>
            <Commend/>
        </Box>
    );
};

export default FeedbackPage;