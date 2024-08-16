import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const DictationDisplay = () => {
    const [messages, setMessages] = useState([]);
    const containerRef = useRef(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }

    useEffect(scrollToBottom, [messages]);

    // Simulate incoming messages
    useEffect(() => {
        const sampleMessages = [
            { user: 'Alice', text: 'Hello everyone, thanks for joining the call.' },
            { user: 'Bob', text: 'Hi Alice, glad to be here.' },
            { user: 'Charlie', text: 'Good morning team, what is on the agenda today?' },
            { user: 'Alice', text: 'We will be discussing the project timeline.' },
            { user: 'Bob', text: 'Sounds good, I have some updates to share as well.' },
            { user: 'David', text: 'Sorry I am late. Can someone catch me up?' },
            { user: 'Alice', text: 'No problem, David. We just started. We are going over the project timeline.' },
            { user: 'Eva', text: 'I have prepared a presentation on our progress so far.' },
            { user: 'Bob', text: 'Great, Eva. Looking forward to seeing that.' },
            { user: 'Charlie', text: 'After the presentation, can we discuss the upcoming milestones?' },
            { user: 'Alice', text: 'Hello everyone, thanks for joining the call.' },
            { user: 'Bob', text: 'Hi Alice, glad to be here.' },
            { user: 'Charlie', text: 'Good morning team, what is on the agenda today?' },
            { user: 'Alice', text: 'We will be discussing the project timeline.' },
            { user: 'Bob', text: 'Sounds good, I have some updates to share as well.' },
            { user: 'David', text: 'Sorry I am late. Can someone catch me up?' },
            { user: 'Alice', text: 'No problem, David. We just started. We are going over the project timeline.' },
            { user: 'Eva', text: 'I have prepared a presentation on our progress so far.' },
            { user: 'Bob', text: 'Great, Eva. Looking forward to seeing that.' },
            { user: 'Charlie', text: 'After the presentation, can we discuss the upcoming milestones?' }
        ];

        const interval = setInterval(() => {
        if (messages.length < sampleMessages.length) {
            setMessages(prev => [...prev, sampleMessages[prev.length]]);
        } else {
            clearInterval(interval);
        }
        }, 2000);

        return () => clearInterval(interval);
    }, [messages]);

    return (
        <Box sx={{ width: '40vw', height: '60vh', borderTop: '3px solid #685A4A'}}>
            <Box 
                elevation={3} 
                ref={containerRef}
                sx={{ 
                    p: 2, 
                    height: '100%', 
                    overflow: 'hidden',
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
                <List sx={{ flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                    {messages.slice().reverse().map((message, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={
                                    <Typography component="span" sx={{ color: '#C8AD9C' }}>
                                        <Typography component="span" fontWeight="bold">{message.user}: </Typography>
                                        {message.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                {messages.length === 0 && (
                    <Typography color='#585141'>Messages will appear here...</Typography>
                )}
            </Box>
        </Box>
    );
};

export default DictationDisplay;