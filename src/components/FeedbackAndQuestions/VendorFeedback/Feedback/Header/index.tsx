import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {ReactComponent as BackIcon} from "../../../../../assets/icons/outlined/arrow-right.svg?svgr";
import {useNavigate} from "react-router-dom";

interface IHeader {
    title: string;
}

const Header = ({title}:IHeader) => {
    const navigate = useNavigate();

    function handleBack() {
        navigate('..');
    }

    return (
        <Box sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            p: 4,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Box onClick={handleBack} sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                <IconButton size='medium'><BackIcon
                    style={{width: '16px', height: '16px', transform: 'rotateZ(180deg)'}}/></IconButton>
                <Typography variant='h2'>{title}</Typography>
            </Box>
            <Typography
                sx={{
                    ml: 'auto',
                    p: '.8rem 1rem',
                    borderRadius: '3.2rem',
                    backgroundColor: 'success.light',
                    color: 'success.main',
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    width: 'clamp(120px, 100%, 200px)',
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap'
                }}>
                Просмотрен
            </Typography>
        </Box>
    );
};

export default Header;