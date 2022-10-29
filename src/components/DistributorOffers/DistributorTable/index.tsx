import React from 'react';
import {GridColDef, GridRowParams} from '@mui/x-data-grid';
import {Box, Button, Typography, Tab, Tabs} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";
import {
    useGetDistributorOffersGroupedByVendorIdQuery
} from "../../../api/distributors";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getSelectedShop} from "../../../store/shops";
import SearchField from "../../common/SearchField";
import { ReactComponent as FilterIcon } from '../../../assets/icons/outlined/filter.svg?svgr';
import {clearProducts, setSelectedDistributorProduct} from "../../../store/distributor";

const DistributorTable = WithTable((props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const Table = props.table;

    const vendorId = useAppSelector(getSelectedShop);

    const { data, isLoading, error } = useGetDistributorOffersGroupedByVendorIdQuery({ id: vendorId?.vendor.id || '', page: props.page, limit: props.limit }, {skip: !vendorId});

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
        { field: 'mods', headerName: 'Модификация товара', flex: 0.15},
        { field: 'productExistence', headerName: 'Остатки', flex: 0.1},
        { field: 'purchasePrice', headerName: 'Закупочная цена', flex: 0.1 },
        { field: 'retailPrice', headerName: 'Розничная цена', flex: 0.1 },
        { field: 'blabla', headerName: 'Лучшее предложение', flex: 0.1 },
        { field: 'offersCount', headerName: 'Кол-во предложений', flex: 0.1 },
    ];

    function handleRowClick(params: GridRowParams) {
        dispatch(setSelectedDistributorProduct(params.row))
        dispatch(clearProducts())
        navigate(`product/${params.id}`);
    }

    return (
        <>
            <Tabs
                value={0}
                sx={{mb: 5}}
            >
                <Tab label={`По каталогу`} id='0' aria-controls={`panel-${0}`} />
            </Tabs>
            <Box sx={{mb: '2.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <SearchField />
                <Button variant="text" startIcon={<FilterIcon />} color="secondary" sx={{color: '#757575', p: '.8rem 2rem', '&.MuiButton-root:hover': {backgroundColor: 'transparent', color: '#1A202C'} }}>Фильтры</Button>
                {/*<CardHeader
                    title='Предложения дистрибьюторов'
                    avatar={<DistributorIcon />}
                    sx={{ padding: '2.4rem' }}
                />*/}
            </Box>

            {
                error ? <Typography>Ошибка запроса</Typography> :
                    data && data.data &&
                    <Table
                        isFetching={isLoading}
                        data={data}
                        columns={columns}
                        formattedData={
                        data.data.map(item => (
                            {...item,
                                id: item.product.id,
                                offersCount: item.offersCount,
                                purchasePrice: item.purchasePrice,
                                name: item.product.name,
                                productExistence: item.productExistence
                            }
                        ))}
                        rowHeight={96}
                        onRowClick={handleRowClick}
                        disableSelectionOnClick
                    />
            }
        </>
    );
});

export default DistributorTable;