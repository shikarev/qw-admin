import React from 'react';
import {CardHeader} from "@mui/material";
import {ReactComponent as ShopBlack} from "../../../assets/icons/outlined/shop.svg?svgr";
import {Outlet} from "react-router-dom";

const VendorQuestions = () => {
    return (
        <>
            <CardHeader
                title='Вопросы к магазину'
                subheader='Контроль вопросов'
                avatar={<ShopBlack/>}
                sx={{padding: '2.4rem'}}
            />
            <Outlet/>
        </>
    );
};

export default VendorQuestions;