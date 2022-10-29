import React from 'react';
import {Tab, Tabs} from "@mui/material";
import DistributorAlsoSells from "../DistributorAlsoSells";
import DistributorProductsOffer from "../DistributorProductsOffer";

const DistributorOrder = () => {

    return (
        <>
            <Tabs
                value={0}
                sx={{mb: 5}}
            >
                <Tab label={`Заказы`} id='0' aria-controls={`panel-${0}`} />
            </Tabs>

            <DistributorProductsOffer limit={10} />

            <DistributorAlsoSells limit={10} />
        </>
    );
};

export default DistributorOrder;