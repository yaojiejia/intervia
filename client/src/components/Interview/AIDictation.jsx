import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import { Mic, MicOff, Send } from '@mui/icons-material';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [socketId, setSocketId] = useState('');
    const [response, setResponse] = useState('');

    const topContainerRef = useRef(null);
    const bottomContainerRef = useRef(null);

    const scrollTopToBottom = () => {
        if (topContainerRef.current) {
            topContainerRef.current.scrollTop = topContainerRef.current.scrollHeight;
        }
    }

    const scrollBottomToTop = () => {
        if (bottomContainerRef.current) {
            bottomContainerRef.current.scrollTop = topContainerRef.current.scrollHeight;
        }

    }

    useEffect(() => {
        scrollTopToBottom();
        scrollBottomToTop();
    }, [messages]);

    useEffect(() => {
        socket.emit('startInterview', inputValue);
        socket.on('startInterview', (msg)=>{
            setInputValue(msg.msg);
            setSocketId(msg.socket);
            setResponse(msg.response);
        });

        return () => {
            socket.off('startInterview');
        };
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (inputValue) {
            const newMessage = inputValue
            setMessages(prev => [...prev, newMessage]);
            setInputValue('');
        }
    }, [inputValue]);

    return (
        <Box sx={{ width: 'calc(40vw - 3px)', height: '60vh', borderTop: '3px solid #685A4A', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box 
                elevation={3} 
                sx={{ 
                    pl: 2, 
                    pr: 2,
                    pb: 1.5,
                    pt: 1.5,
                    height: 'calc((100% - 60px)/2)', 
                    display: 'flex',
                    overflowY: 'auto',
                    width: '100%',
                    flexDirection: 'column',
                    '&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.1)',
                        outline: '1px solid slategrey'
                    }
                }}
            >
                <List ref={topContainerRef} sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {messages.map((message, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={
                                    <Typography component="span" sx={{ color: '#C8AD9C' }}>
                                        <Typography component="span" fontWeight="bold">System: </Typography>
                                        "{response}" given by socket {socketId}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider sx={{
                width: '80%',
                borderColor: 'rgba(104, 90, 74, 0.5)',
                borderStyle: 'dashed',
                borderWidth: '2px 0 0',
            }} />
            <Box 
                elevation={3} 
                sx={{ 
                    pl: 2, 
                    pt: 1.5,
                    pb: 1,
                    height: 'calc((100% - 60px)/2)',
                    width: '100%',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    '&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.1)',
                        outline: '1px solid slategrey'
                    }
                }}
            >
                <List ref={bottomContainerRef} sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {messages.map((message, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={
                                    <Typography component="span" sx={{ color: '#C8AD9C' }}>
                                        <Typography component="span" fontWeight="bold">User: </Typography>
                                        {message}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box
                component="form" 
                onSubmit={handleSubmit}
                sx={{ 
                    display: 'flex', 
                    height: '60px',
                    width: '100%',
                    padding: '10px',
                    boxSizing: 'border-box'
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type or speak a message..."
                    sx={{ 
                        mr: 1,
                        height: '40px', 
                        '& .MuiInputBase-input::placeholder': {
                            color: '#8a7f67',
                            opacity: 1,
                        },
                        '& .MuiInputBase-input': {
                        color: '#8a7f67',
                        },
                        '& .MuiOutlinedInput-root': {
                            height: '40px',
                            '& fieldset': {
                                borderColor: '#383121',
                            },
                            '&:hover fieldset': {
                                borderColor: '#4a4332',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#4a4332',
                            },
                        },
                    }}
                />
                <Button 
                    type="submit" 
                    variant="contained"
                    sx={{ 
                        minWidth: '40px', 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#383121',
                        '&:hover': {
                            backgroundColor: '#4a4332',
                        },
                    }}
                    // onClick={()=>{socket.emit('startInterview', inputValue)}}
                >
                    <Send/>
                </Button>
            </Box>
        </Box>
    );
};

export default ChatComponent;