import React, {useEffect} from 'react';
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";
import {GridColDef, GridRowParams} from "@mui/x-data-grid";
import {Box, Typography} from "@mui/material";
import {useGetDistributorAsloSellsQuery} from "../../../api/distributors";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getSelectedShop} from "../../../store/shops";
import {
    addProduct, getProducts,
    getSelectedProductOffer,
} from "../../../store/distributor";
import AddItemButton from "./AddItemButton";

const DistributorAlsoSells = WithTable((props) => {

    const vendorId = useAppSelector(getSelectedShop)?.vendor.id;

    const productOffer = useAppSelector(getSelectedProductOffer)

    const productsList = useAppSelector(getProducts)

    const Table = props.table;

    const {data} = useGetDistributorAsloSellsQuery({distributorId: productOffer.selectedDistributorOffer.vendor.id, currentVendorId: vendorId || ''}, {skip: !vendorId})

    const dispatch = useAppDispatch();

    const addItem = (item: any) => {
        if(item.product.id === productOffer.selectedDistributorProduct.id) {
            dispatch(addProduct(item))
        } else {
            dispatch(addProduct(item))
        }
    }

    //disabled={JSON.stringify(productsList).includes(params.row.id)}

    useEffect(() => {
        dispatch(addProduct(productOffer.selectedDistributorProduct))
    },[dispatch])

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Название товара',
            sortable: false,
            minWidth: 200,
            flex: 0.35,
            renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', pl: '2.2rem' }}>
                <Typography variant='h6' sx={{ whiteSpace: 'pre-wrap' }}>{params.formattedValue}</Typography>
            </Box>
        },
        { field: 'mod', headerName: 'Модификация товара', flex: 0.15},
        { field: 'productExistence', headerName: 'Остатки', flex: 0.1},
        { field: 'optPrice', headerName: 'Закупочная цена', flex: 0.1 },
        { field: 'retailPrice', headerName: 'Розничная цена', flex: 0.1 },
        { field: 'purchasePrice', headerName: 'Цена', flex: 0.1 },
        { field: 'offersCount', headerName: 'Кол-во предложений', flex: 0.1 },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            minWidth: 60,
            flex: 0.1,
            renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', pl: '2.2rem' }}>
                <AddItemButton
                    onClick={() => addItem(params.row)}
                    checked={productsList.find(item => item.product.id === params.row.id)}
                />
            </Box>
        },
    ];

    return (
        <>
            <Box sx={{p: '2.4rem'}}>
                <Typography sx={{fontWeight: 600, fontSize: 16, mr: '4rem'}}>Другие товары дистрибьютора</Typography>
            </Box>

            {data && data.data &&
                <Table
                    isFetching={true}
                    data={data}
                    columns={columns}
                    formattedData={
                        data.data.map(item => (
                            {...item,
                                id: item.product.id,
                                name: item.product.name,
                                //mod: item.mod,
                                productExistence: item.productExistence,
                                //optPrice: item.optPrice,
                                retailPrice: item.retailPrice,
                                purchasePrice: item.purchasePrice,

                            }
                        ))}
                    rowHeight={96}
                    disableSelectionOnClick
                    //pageSize={3}
                />
            }
        </>
    );
});

export default DistributorAlsoSells;