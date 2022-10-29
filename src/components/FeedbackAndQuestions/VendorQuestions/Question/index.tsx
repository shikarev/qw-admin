import React from 'react';
import {useParams} from "react-router-dom";
import {Box, Divider, Typography} from "@mui/material";
import Header from "../../VendorFeedback/Feedback/Header";
import {useAppSelector} from "../../../../store/hooks";
import {getSelectedQuestion} from "../../../../store/questions";
import ColoredAvatar from "../../../common/ColoredAvatar";
import moment from "moment/moment";

const Question = () => {
    const {id} = useParams();
    const selectedQuestion = useAppSelector(getSelectedQuestion);

    return (
        <Box sx={{backgroundColor: 'secondary.light', borderRadius: ' 3.2rem', p: '2rem', pr: '2.4rem'}}>
            <Box sx={{boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.08)', borderRadius: ' 3.2rem', overflow: 'hidden'}}>
                <Header title='Вопрос'/>
                <Divider variant="fullWidth" sx={{borderColor: 'secondary.main'}}/>
                <Box sx={{
                    backgroundColor: (theme) => theme.palette.background.default,
                    p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
                >
                    {id && selectedQuestion &&
                        <Box sx={{
                            ml: 10, mt: 3, display: 'flex', flexDirection: 'column', width: '-webkit-fill-available',
                        }}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <ColoredAvatar name={selectedQuestion.authorName} picture={selectedQuestion.authorPicturePath} size={44}/>
                                <Box sx={{ml: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
                                    <Typography
                                        sx={{fontSize: '1.6rem', fontWeight: '600'}}>{selectedQuestion.authorName}
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{ml: 'auto', color: 'secondary.dark', fontSize: '1.2rem', fontWeight: '500'}}>
                                    {moment(selectedQuestion.created).startOf('minute').fromNow()}
                                </Typography>
                            </Box>
                            <Box sx={{mt: 4}}>
                                <Typography
                                    sx={{mb: 1, fontSize: '1.3rem', fontWeight: '700'}}>Вопрос:</Typography>
                                <Typography sx={{fontSize: '1.4rem'}}>{selectedQuestion.note}</Typography>
                            </Box>
                        </Box>
                    }
                    {!selectedQuestion &&
                        <Typography> Пожалуйста, выберите вопрос из таблицы с вопросами!</Typography>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default Question;