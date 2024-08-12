import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const CustomJobDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJob, setSelectedJob] = useState('');
    
    const YellowExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
        color: '#CFB53B',
    }));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (job) => {
        setSelectedJob(job);
        handleClose();
    };

    const jobs = [
        'Software engineer',
        'Data analyst',
        'Product manager',
        'Investment banker',
        'Marketing specialist',
    ];

    return (
        <Box>
            <Button
                onClick={handleClick}
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    width: '32vw',
                    minHeight: "9vh",
                    justifyContent: 'space-between',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    border: "1px solid rgba(189, 193, 44, 0.5)",
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                }}
                endIcon={<YellowExpandMoreIcon />}
            >
                <Typography sx={{ padding: '1vw', fontSize: '3vh', textTransform: 'none'}}>
                    {selectedJob || 'Which job are you preparing for?'}
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'black',
                        borderRadius: '15px',
                        width: '30vw',
                        marginTop: '1vh'
                    },
                }}
            >
                {jobs.map((job) => (
                    <MenuItem
                        key={job}
                        onClick={() => handleSelect(job)}
                        sx={{
                            color: '#CFB53B',
                            whiteSpace: 'normal',
                            '&:hover': {
                                backgroundColor: '#333',
                            },
                        }}
                    >
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                width: '100%', 
                                minHeight: '6vh'
                            }}>
                            <Box
                                sx={{
                                    width: "2.5vh",
                                    height: "2.5vh",
                                    borderRadius: '50%',
                                    border: '2px solid #CFB53B',
                                    mr: 2,
                                }}
                            />
                            <Typography 
                                sx={{
                                    fontSize: '2.7vh', 
                                    width: 'calc(100% - 2.5vh - 8px)', 
                                    overflow: 'hidden',
                                    color: 'white'
                                }}>
                                {job}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default CustomJobDropdown;