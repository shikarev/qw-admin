import React, {useEffect} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

const FeedbackAndQuestions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(-1);

    const routes = ['vendor_questions','products_questions','products_feedback','vendor_feedback']

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(`${routes[newValue]}`);
    };

    useEffect(() => {
        //find and set tab
        let index = -1;
        routes.forEach(route => {
            if(location.pathname.includes(route)){
                index = routes.indexOf(route);
            }
        })
        setValue(index);
    } ,[location])

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Tabs
                value={value >= 0 ? value : false}
                sx={{mb: 5}}
                onChange={handleChange}
            >
                <Tab label={`Вопросы к магазину`} id='0' aria-controls={`panel-${0}`}/>
                <Tab label={`Вопросы к товарам`} id='1' aria-controls={`panel-${1}`}/>
                <Tab label={`Отзывы на товары`} id='2' aria-controls={`panel-${2}`}/>
                <Tab label={`Отзывы на магазин`} id='3' aria-controls={`panel-${3}`}/>
            </Tabs>
            <Outlet />
        </Box>
    );
};

export default FeedbackAndQuestions;