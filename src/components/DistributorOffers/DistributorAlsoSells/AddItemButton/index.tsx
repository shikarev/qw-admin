import React, {useState} from 'react';
import { ReactComponent as AddPlus } from '../../../../assets/icons/outlined/plus-icon.svg?svgr';
import { ReactComponent as Check } from '../../../../assets/icons/outlined/check-icon.svg?svgr';
import {IconButton} from "@mui/material";

const AddItemButton = (props:any) => {

    return (
        <IconButton onClick={props.onClick} disabled={!!props.checked}>
            {props.checked ? <Check /> : <AddPlus />}
        </IconButton>
    );
};

export default AddItemButton;