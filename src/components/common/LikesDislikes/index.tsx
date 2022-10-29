import React from 'react';
import {ReactComponent as ThumbsUpFilledIcon} from "../../../assets/icons/filled/thumbs-up-filled.svg?svgr";
import {ReactComponent as ThumbsUpIcon} from "../../../assets/icons/outlined/thumbsUp.svg?svgr";
import {Box, Typography, useTheme} from "@mui/material";

interface ILikesDislikes {
    likeCount?: number;
    dislikeCount?: number;
    alignLeft?: boolean;
}

const LikesDislikes = ({likeCount, dislikeCount, alignLeft}:ILikesDislikes) => {
    const theme = useTheme();

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: alignLeft ? 'flex-end' : 'unset'}}>
            {!!likeCount
                ?
                <ThumbsUpFilledIcon style={{color: theme.palette.primary.main}}/>
                :
                <ThumbsUpIcon/>
            }
            <Typography sx={{
                ml: 1,
                mr: 6,
                fontSize: '1.6rem',
                fontWeight: '600'
            }}>
                {likeCount ?? 0}
            </Typography>
            {!!dislikeCount
                ?
                <ThumbsUpFilledIcon
                    style={{color: theme.palette.warning.main, transform: 'rotateX(180deg)'}}/>
                :
                <ThumbsUpIcon style={{transform: 'rotateX(180deg)'}}/>
            }
            <Typography sx={{
                ml: 1,
                fontSize: '1.6rem',
                fontWeight: '600'
            }}>
                {dislikeCount ?? 0}
            </Typography>
        </Box>
    );
};

export default LikesDislikes;