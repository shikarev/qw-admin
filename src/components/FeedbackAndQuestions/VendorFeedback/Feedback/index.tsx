import React from 'react';
import {useParams} from "react-router-dom";
import {Box, Divider} from "@mui/material";
import AnswerForm from "./AnswerForm";
import MainContent from "./MainContent";
import Header from "./Header";
import Notes from "./Notes";

const Feedback = () => {
    const {id} = useParams();

    return (
        <Box sx={{backgroundColor: 'secondary.light', borderRadius: ' 3.2rem', p: '2rem', pr: '2.4rem'}}>
            <Box sx={{boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.08)', borderRadius: ' 3.2rem', overflow: 'hidden'}}>
                <Header title='Отзыв'/>
                <Divider variant="fullWidth" sx={{borderColor: 'secondary.main'}}/>
                <Box sx={{
                    backgroundColor: (theme) => theme.palette.background.default,
                    p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
                >
                    {id &&
                    <>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <MainContent id={id}/>
                            <AnswerForm id={id}/>
                        </Box>
                        <Notes id={id}/>
                    </>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default Feedback;