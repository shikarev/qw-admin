import React from 'react';
import MuiPagination from '@mui/material/Pagination';
import { Box, MenuItem, Select } from '@mui/material';

interface IPagination {
  paginationProps: typeof MuiPagination;
}

const Pagination = ({paginationProps}:IPagination) => {
  return (
    <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Select>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
      <MuiPagination {...paginationProps}/>
    </Box>
  );
};

export default Pagination;