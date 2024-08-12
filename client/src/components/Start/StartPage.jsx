import StartInterviewButton from './StartBox';
import Logo2 from './image/Logo2.png';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const StartPage = () => {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100vh"
                sx={{
                    margin: 0,
                    padding: 0,
                    background: 'linear-gradient(135deg, #383121 0%, #383121 40%, #000000 100%)',
                }}
            >
                <img src={Logo2} alt="logo" style={{ height: '12vh', marginBottom: '5vh' }}/>
                <StartInterviewButton/>
            </Box>
        );
    };
    
    export default StartPage;