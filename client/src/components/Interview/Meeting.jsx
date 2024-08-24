import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from '@mui/material';
import {
    Videocam,
    VideocamOff,
    Mic,
    MicOff,
    Chat,
    Close,
    Send,
    CallEnd,
    AutoAwesome,
} from '@mui/icons-material';
import profile from './image/profile_1.png';
import io from 'socket.io-client';

export default function Meeting() {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isCallActive, setIsCallActive] = useState(true);
    const [openHangupDialog, setOpenHangupDialog] = useState(false);
    const [isAIDictationOn, setIsAIDictationOn] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const videoRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const micStreamRef = useRef(null);
    const recognitionRef = useRef(null);

    const socket = io('http://localhost:4000');

    useEffect(() => {
        if (isCameraOn && isCallActive) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.error("Error accessing camera:", err));
        } else if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    }, [isCameraOn, isCallActive]);

    useEffect(() => {
        let animationFrameId;

        const setupAudio = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                micStreamRef.current = stream;
                
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                analyserRef.current = audioContextRef.current.createAnalyser();
                const source = audioContextRef.current.createMediaStreamSource(stream);
                source.connect(analyserRef.current);
                detectSound();
            } catch (err) {
                console.error("Error accessing microphone:", err);
            }
        };

        const detectSound = () => {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const checkSound = () => {
                analyserRef.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                setIsSpeaking(average > 5);
                if (isMicOn) {
                    animationFrameId = requestAnimationFrame(checkSound);
                }
            };

            checkSound();
        };

        const cleanupAudio = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
            setIsSpeaking(false);
        };

        if (isMicOn) {
            setupAudio();
        } else {
            cleanupAudio();
        }

        return cleanupAudio;
    }, [isMicOn]);

    useEffect(() => {
        if (isAIDictationOn && isMicOn) {
            startDictation();
        } else {
            stopDictation();
        }
    }, [isAIDictationOn, isMicOn]);

    const startDictation = () => {
        if ('webkitSpeechRecognition' in window) {
            recognitionRef.current = new window.webkitSpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const transcript = event.results[i][0].transcript;
                        console.log(transcript);
                        socket.emit('startInterview', transcript);
                        socket.on('systemMsg', handleServerMessage);
                    }
                }
            };

            recognitionRef.current.start();
        } else {
            console.error('Speech recognition not supported');
        }
    };

    const stopDictation = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const toggleCamera = () => setIsCameraOn(!isCameraOn);
    const toggleMic = () => setIsMicOn(!isMicOn);
    const toggleAIDictation = () => setIsAIDictationOn(!isAIDictationOn);

    const handleHangupClick = () => {
        setOpenHangupDialog(true);
    };

    const handleServerMessage = (message) => {
        console.log(`Handle Server ${message}`);
        setReceivedMessages(prevMessages => [...prevMessages, message]);
    };

    const handleHangupConfirm = () => {
        setIsCallActive(false);
        setIsCameraOn(false);
        setIsMicOn(false);
        setOpenHangupDialog(false);
        setIsAIDictationOn(false);
    };

    const handleHangupCancel = () => {
        setOpenHangupDialog(false);
    };

    if (!isCallActive) {
        return (
            <Box sx={{ 
                height: '100vh',
                width: '60vw', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Typography variant="h2" color='#847137' fontWeight="bold">Call Ended</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            height: '100vh',
            width: '60vw',
        }}>
            <Box sx={{ 
                position: 'relative', 
                width: '60vw', 
                height: '100vh', 
                overflow: 'hidden',
                border: isSpeaking ? '2.5px solid #ffe591' : '2.5px solid transparent',
                transition: 'border 0.3s ease',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {!isCameraOn && (
                       <img src={profile} alt="Profile" style={{ height: '45vh' }}/>
                    )}
                </Box>
                {isCameraOn && (
                    <video
                        ref={videoRef}
                        autoPlay
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <IconButton onClick={toggleCamera} color="primary" sx={{ bgcolor: 'white' }}>
                        {isCameraOn ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                    <IconButton onClick={toggleMic} color="primary" sx={{ bgcolor: 'white' }}>
                        {isMicOn ? <Mic /> : <MicOff />}
                    </IconButton>
                    <Tooltip title="Toggle AI Dictation">
                        <IconButton 
                            onClick={toggleAIDictation} 
                            color={isAIDictationOn ? "secondary" : "primary"} 
                            sx={{ bgcolor: 'white' }}
                        >
                            <AutoAwesome />
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={handleHangupClick} sx={{ bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }}>
                        <CallEnd />
                    </IconButton>
                </Box>
                
                {isAIDictationOn && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 1,
                            zIndex: 2
                        }}
                    >
                        <Typography variant="body2">AI Dictation Active</Typography>
                    </Box>
                )}
            </Box>

            <Dialog
                open={openHangupDialog}
                onClose={handleHangupCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"End the call?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to hang up and end the call?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHangupCancel}>Cancel</Button>
                    <Button onClick={handleHangupConfirm} autoFocus>
                        Hang Up
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}