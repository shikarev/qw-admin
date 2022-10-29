import React from 'react';
import {Avatar, SxProps} from "@mui/material";
import {nameToInitials} from "../../../utils/nameToInitials";
import {stringToColor} from "../../../utils/stringToColor";

interface IColoredAvatar {
    name?: string;
    picture?: string;
    size?: number;
    sx?: SxProps;
}

const ColoredAvatar = ({name, picture, size, sx}: IColoredAvatar) => {
    return (
        <Avatar src={picture} sx={{
            fontSize: '1.5rem',
            width: size ? `${size}px` : "unset",
            height: size ? `${size}px` : "unset",
            backgroundColor: name ? `${stringToColor(name)}` : 'secondary.main',
            ...sx
        }}>
            {name && nameToInitials(name)}
        </Avatar>
    );
};

export default ColoredAvatar;