import React from 'react';
import { Box, Typography } from '@mui/material';

const Commend = () => {
    return (
        <Box sx={{
            p: 3, 
            color: 'white',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{width: '70vw', display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{ fontSize: '3.5vh', mr: 2}}>
                    Improved response:
                </Typography>
                <Typography sx={{width: '50vw', fontSize: '2.6vh'}}>
                    A binary search tree is a structure where each node has <Box component="span" sx={{ color: 'red' }}>two</Box> children, 
                    with the left child containing a value <Box component="span" sx={{ color: 'red' }}>less</Box> than its parent and the 
                    right child containing a value <Box component="span" sx={{ color: 'red' }}>greater</Box> than its parent. This allows 
                    for <Box component="span" sx={{ color: 'red' }}>fast</Box> searching, insertion, and deletion operations.
                </Typography>
            </Box>
        </Box>
    );
};

export default Commend;