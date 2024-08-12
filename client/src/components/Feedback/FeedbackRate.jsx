import React, { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const FeedbackInterface = () => {
    const [feedbackItems, setFeedbackItems] = useState([
        { label: 'Accuracy', value: 2.5 },
        { label: 'Fluency', value: 4 },
        { label: 'Professionalism', value: 3 },
    ]);

    const handleSliderChange = (index) => (event, newValue) => {
        const newFeedbackItems = [...feedbackItems];
        newFeedbackItems[index].value = newValue;
        setFeedbackItems(newFeedbackItems);
    };

    return (
        <Box sx={{ 
            p: 3, 
            color: 'white',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5vh' }}>
                <Typography style={{ fontSize: '6.5vh', marginBottom: '4vh'}}>
                    Feedback
                </Typography>
            </Box>
            <Box sx={{height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                {feedbackItems.map((item, index) => (
                    <Box sx={{ display: 'flex', width: '70vw', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography sx={{ fontSize: '3.5vh', mr: 2 }}>
                            {item.label}:
                        </Typography>
                        <Box sx={{width: '27vw', display: 'flex', justifyContent: 'space-between'}}>
                            <Slider
                                value={item.value}
                                onChange={handleSliderChange(index)}
                                min={0}
                                max={5}
                                step={0.5}
                                sx={{
                                    color: 'black',
                                    height: '20px',
                                    width: '20vw',
                                    mr: 2,
                                    padding: '0 !important',
                                    '& .MuiSlider-thumb': {
                                        width: '0 !important',
                                        height: '0 !important',
                                        backgroundColor: 'transparent !important',
                                        border: 'none !important',
                                        boxShadow: 'none !important',
                                        margin: '0 !important',
                                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                            boxShadow: 'none !important',
                                            outline: 'none !important',
                                        },
                                        '&::after, &::before': {
                                            display: 'none !important',
                                        },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.5,
                                        backgroundColor: '#bfbfbf',
                                    },
                                    '& .MuiSlider-track': {
                                        border: 'none',
                                        height: '100%',
                                    },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            />
                            <Typography sx={{ fontSize: '3.2vh', display: 'flex', alignItems: 'center'}}>
                                {item.value % 1 === 0 ? item.value.toFixed(0) : item.value.toFixed(1)}/5
                            </Typography>
                        </Box>
                    </Box>
                ))}

            </Box>
        </Box>
    );
};

export default FeedbackInterface;