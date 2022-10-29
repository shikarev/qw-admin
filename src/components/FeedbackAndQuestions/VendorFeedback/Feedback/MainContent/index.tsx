import React from 'react';
import {Box, CircularProgress, Rating, Typography} from "@mui/material";
import moment from "moment/moment";
import {useGetFeedbackByIdQuery} from "../../../../../api/feedback";
import LikesDislikes from "../../../../common/LikesDislikes";
import ColoredAvatar from "../../../../common/ColoredAvatar";

interface IMainContent {
    id: string;
}

const MainContent = ({id}: IMainContent) => {
    const {data, isLoading} = useGetFeedbackByIdQuery(id);

    return (
        <>
            {isLoading ?
                <Box sx={{width: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem'}}>
                    <CircularProgress/>
                </Box> :
                data &&
                <>
                    {/* HEADER */}
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <ColoredAvatar name={data.userName} picture={data.userPicturePath} size={44}/>
                        <Box sx={{ml: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <Typography
                                sx={{fontSize: '1.6rem', fontWeight: '600'}}>{data.userName}
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Rating readOnly size="large" value={data.rate} sx={{color: 'primary.main'}}/>
                                <Typography
                                    sx={{ml: 1, fontSize: '1.4rem', fontWeight: '600'}}>{data.rate}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ml: 'auto', color: 'secondary.dark', fontSize: '1.2rem', fontWeight: '500'}}>
                            {moment(data.created).startOf('minute').fromNow()}
                        </Typography>
                    </Box>

                    {/* MEDIA */}
                    <Box sx={{display: 'flex', mt: 3}}>
                        {data.media?.video && Object.values(data.media.video).map(item =>
                            <Box key={item.id}
                                 sx={{
                                     mr: 3, borderRadius: '.8rem', backgroundColor: 'secondary.light',
                                     background: `url(${item})`, width: '50px', height: '66px'
                                 }}
                            />
                        )}
                    </Box>

                    {/* FEEDBACK */}
                    <Box sx={{
                        ml: 1, mt: 3, display: 'flex', flexDirection: 'column', width: '100%',
                        '& > div': {display: 'flex', flexDirection: 'column', m: '.4rem 0'},
                        '& svg': {flex: '0 0 16px', width: '16px', height: '16px', mr: 2}
                    }}>
                        {data.advantage &&
                        <Box>
                            <Typography
                                sx={{mb: 1, fontSize: '1.3rem', fontWeight: '700'}}>Достоинства</Typography>
                            <Typography sx={{fontSize: '1.4rem'}}>{data.advantage}</Typography>
                        </Box>
                        }
                        {data.disadvantage &&
                        <Box>
                            <Typography
                                sx={{mb: 1, fontSize: '1.3rem', fontWeight: '700'}}>Недостатки</Typography>
                            <Typography sx={{fontSize: '1.4rem'}}>{data.disadvantage}</Typography>
                        </Box>
                        }
                        {data.note &&
                        <Box>
                            <Typography
                                sx={{mb: 1, fontSize: '1.3rem', fontWeight: '700'}}>Комментарий</Typography>
                            <Typography sx={{fontSize: '1.4rem'}}>{data.note}</Typography>
                        </Box>
                        }
                    </Box>
                    <Box sx={{mt: 3, mb: 3}}>
                        <LikesDislikes likeCount={data.likeCount} dislikeCount={data.dislikeCount} alignLeft/>
                    </Box>
                </>
            }
        </>
    );
};

export default MainContent;