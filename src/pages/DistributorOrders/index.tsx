import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {Outlet} from "react-router-dom";

const DistributorOrders = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Tabs
                value={value}
                sx={{mb: 5}}
                onChange={handleChange}
            >
                <Tab label={`Заказы`} id='0' aria-controls={`panel-${0}`} />
            </Tabs>
            <Outlet />
        </Box>
    );
};

export default DistributorOrders;