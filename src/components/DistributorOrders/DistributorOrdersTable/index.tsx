import React from 'react';
import {GridColDef, GridRowParams} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";
import {
    useGetMyOrdersByVendorIdQuery
} from "../../../api/distributors";
import {useAppSelector} from "../../../store/hooks";
import {getSelectedShop} from "../../../store/shops";

const DistributorOrdersTable = WithTable((props) => {
    const navigate = useNavigate();

    const Table = props.table;

    const vendorId = useAppSelector(getSelectedShop);

    const { data, isLoading, error } = useGetMyOrdersByVendorIdQuery({ vendorId: vendorId?.vendor.id || '', page: props.page, limit: props.limit }, {skip: !vendorId});



    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Номер заказа',
            sortable: false,
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', pl: '2.2rem' }}>
                <Typography variant='h6' sx={{ whiteSpace: 'pre-wrap' }}>{params.formattedValue}</Typography>
            </Box>
        },
        {
            field: 'distributorName',
            headerName: 'Название дистрибьютора',
            sortable: false,
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', pl: '2.2rem' }}>
                <Typography variant='h6' sx={{ whiteSpace: 'pre-wrap' }}>{params.formattedValue}</Typography>
            </Box>
        },
        { field: 'total', headerName: 'Сумма', flex: 0.25 },
        {
            field: 'orderStatus',
            headerName: 'Статус',
            flex: 0.25,
            renderCell: (params) =>
                <>
                    {params.formattedValue === "delivered" &&
                        <Typography
                            sx={{
                            p: '.8rem 1rem',
                            borderRadius: '3.2rem',
                            backgroundColor: '#2975FF1A',
                            color: '#2975FF',
                            fontSize: '1.4rem',
                            fontWeight: '500',
                            width: 'fit-content',
                            textAlign: 'center',
                            whiteSpace: 'pre-wrap'
                        }}
                        >
                            Доставлено
                        </Typography>
                    }

                    {params.formattedValue === "created" &&
                        <Typography
                            sx={{
                                p: '.8rem 1rem',
                                borderRadius: '3.2rem',
                                backgroundColor: 'success.light',
                                color: 'success.main',
                                fontSize: '1.4rem',
                                fontWeight: '500',
                                width: 'fit-content',
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap'
                            }}
                        >
                            Новый
                        </Typography>
                    }
                </>

        },
        {
            field: "action",
            headerName: "",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Typography sx={{whiteSpace: 'pre-wrap', cursor: 'pointer', color: '#757575'}}>В каталог</Typography>
            )
        },
    ];

    /*function handleRowClick(params: GridRowParams) {
        navigate(`product/${params.id}`);
    }*/

    return (
        <>
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
                                id: item.id,
                                name: item.id,
                                total: item.orderTotalCost,
                                orderStatus: item.orderStatus,
                            }
                        ))}
                        rowHeight={96}
                        disableSelectionOnClick
                        pageSize={3}
                    />
            }
        </>
    );
});

export default DistributorOrdersTable;