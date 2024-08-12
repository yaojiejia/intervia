import React from 'react';
import { Typography, Box } from '@mui/material';
import faviconImage from './image/favicon.png';
import profile from './image/profile_1.png';

const QuestionAndAnswer = () => {
    return (
        <Box sx={{ color: 'white', padding: '7vh 3.5vw', width: '50vw', height: '100vh', borderRight: '3px solid black' }}>
            <Box sx={{ height: '33%', display: 'flex' }}>
                <img src={faviconImage} alt="Favicon" style={{ height: '7vh' }}/>
                <Typography sx={{ fontSize: '2.6vh', marginLeft: '2vw' }}>
                    Can You Explain the Concept of a Binary Search Tree?
                </Typography>
            </Box>
            <Box sx={{ height: '65%', display: 'flex' }}>
                <img src={profile} alt="Profile" style={{ height: '7vh' }}/>
                <Typography sx={{ fontSize: '2.6vh', marginLeft: '2vw' }}>
                    A binary search tree is a structure where each node has three children, with the left child containing a value more than its parent and the right child containing a value less than its parent. This allows for slow searching, insertion, and deletion operations.
                </Typography>
            </Box>
        </Box>
    );
};

export default QuestionAndAnswer;