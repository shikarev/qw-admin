import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import { ReactComponent as Minus } from '../../../../../assets/icons/outlined/minus.svg?svgr';
import { ReactComponent as Plus } from '../../../../../assets/icons/outlined/plus.svg?svgr';

const Incrementor = ({ min, max, value, onChange }:any) => {

    const clamp = (min: number, max: number) => (v: number) => (v <= min ? min : v >= max ? max : v);

    const clampV = clamp(min, max);
    const disableMin = value === min;
    const disableMax = value === max;


    return (
        <Box sx={{display: 'flex', alignItems: 'center', height: 22}}>
            <IconButton sx={{backgroundColor: '#F6F7FB', fontSize: '2rem', width: '22px', height: '22px'}} onClick={() => onChange(clampV(value - 1))} disabled={disableMin}>
                <Minus />
            </IconButton>
            <Typography sx={{px: '1.6rem', fontWeight: 600, fontSize: 12, lineHeight: '15px', textAlign: 'center', minWidth: '6rem'}} aria-label="value">{value}</Typography>
            <IconButton sx={{backgroundColor: '#F6F7FB', fontSize: '2rem', width: '22px', height: '22px'}} onClick={() => onChange(clampV(value + 1))} disabled={disableMax}>
                <Plus />
            </IconButton>
        </Box>
    );
};

export default Incrementor;