import React from 'react';
import {CardHeader} from "@mui/material";
import {ReactComponent as ShopBlack} from "../../../assets/icons/outlined/shop.svg?svgr";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../../store/hooks";
import {getSelectedShop} from "../../../store/shops";

const VendorFeedback = () => {

    return (
        <>
            <CardHeader
                title='Отзывы на магазин'
                subheader='Контроль отзывов'
                avatar={<ShopBlack/>}
                sx={{padding: '2.4rem'}}
            />
            <Outlet/>
        </>
    );
};

export default VendorFeedback;