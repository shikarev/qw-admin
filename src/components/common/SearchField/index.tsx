import React from 'react';
import {Box, InputAdornment, TextField} from "@mui/material";
import { ReactComponent as SearchIcon } from '../../../assets/icons/outlined/Search.svg?svgr';

const SearchField = () => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '80%',
            }}
        >
            <TextField
                label={false}
                placeholder="Поиск по Товару, Цене и тд."
                fullWidth
                id="fullWidth"
                sx={{'& .MuiOutlinedInput-input':{p: '1.2rem'}}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchField;