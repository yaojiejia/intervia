import CustomJobDropdown from './JobType';
import CustomQuestionDropdown from './QuestionType';
import Logo2 from './image/Logo2.png';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const PreInterviewPage = () => {
        return (
            <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                height="100vh"
                sx={{
                    margin: 0,
                    padding: 0,
                    background: 'linear-gradient(135deg, #383121 0%, #383121 40%, #000000 100%)',
                }}
            >
                <img src={Logo2} alt="logo" style={{ height: '12vh', marginBottom: '10vh', marginTop: '10vh' }}/>
                <Box display="flex" justifyContent="space-between" sx={{width: "70vw"}}>
                    <CustomJobDropdown/>
                    <CustomQuestionDropdown/>
                </Box>
            </Box>
        );
    };
    
    export default PreInterviewPage;