import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { alpha } from '@mui/material/styles';

const StartInterviewButton = () => {
    const handleClick = () => {
      console.log('Mock Interview Started!');
      // Add your logic here to start the mock interview
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                margin: 0,
                padding: 0,
            }}
        >
            <Box 
                sx={{
                    height: "14vh", 
                    width: "40vw", 
                    borderRadius: "20px",
                    backgroundColor: alpha('#1c1c1c', 0.9),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "25px !important",
                    border: "1px solid rgba(189, 193, 44, 0.5)"
                }}
            >
                <Box 
                    sx={{
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center",
                        width: "100%"}}
                >
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                        <Typography 
                            component="span" 
                            sx={{
                                mr: 2, 
                                color: "white",
                                fontSize: '3.2vh'
                            }}
                        >
                            Start Mock Interview
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            endIcon={<ArrowForwardIcon style={{ fontSize: "180%", color: "black" }} />}
                            sx={{
                                width: '3vw',
                                height: '5vh',
                                padding: 0,
                                '& .MuiButton-endIcon': {
                                    ml: 0,
                                    mr: 0,
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                },
                                backgroundColor: '#bdc12c',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(189, 193, 44, 0.5)', // 80% opacity on hover
                                },
                            }}
                        >
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default StartInterviewButton;