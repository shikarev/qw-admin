import React, {SyntheticEvent, useState} from 'react';
import {useGetDistributorOffersByProductIdQuery} from "../../../api/distributors";
import {Link, useNavigate, useParams} from "react-router-dom";
import {GridColDef, GridRowId, GridRowParams} from "@mui/x-data-grid";
import {Box, Button, CardHeader, Tab, Tabs, Typography} from "@mui/material";
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getSelectedShop} from "../../../store/shops";
import {useGetProductQuery} from "../../../api/products";
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import CheckRadio from "../../common/CheckRadio";
import {setSelectedDistributorOffer} from "../../../store/distributor";

const DistributorProduct = WithTable((props) => {

    const dispatch = useAppDispatch();

    const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

    const Table = props.table;

    const {id} = useParams();

    const vendorId = useAppSelector(getSelectedShop);

    const { data, isLoading, error } = useGetDistributorOffersByProductIdQuery({ productId: id || '', vendorId: vendorId?.vendor.id || '', page: props.page, limit: props.limit }, {skip: !vendorId})

    const {data: productData} = useGetProductQuery({id: id || ''})

    function imageOnErrorHandler (event: React.SyntheticEvent<HTMLImageElement, Event>) {
        event.currentTarget.src = placeholder;
        event.currentTarget.className = "error";
    }

    const navigate = useNavigate();

    const toOrder = () => {
        //const id = data?.data.find(row => row.id === selectionModel[0])?.vendor?.id
        const price = data?.data.find(row => row.id === selectionModel[0])
        const id = selectionModel[0]
        if(id) {
            dispatch(setSelectedDistributorOffer(price))
            navigate(`${id}`);
        }
    }


    const columns: GridColDef[] = [
        {
            field: "checkboxSelection",
            headerName: "",
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <CheckRadio checked={selectionModel[0] === params.id} value={params.id} />
            )
        },
        {
            field: 'name',
            headerName: 'Название дистрибьютора',
            sortable: false,
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ whiteSpace: 'pre-wrap' }}>{params.formattedValue}</Typography>
            </Box>
        },
        { field: 'rating', headerName: 'Рейтинг', flex: 0.1 },
        { field: 'cost', headerName: 'Цена', flex: 0.1 },
        { field: 'condition', headerName: 'Условия', flex: 0.2 },
        { field: 'sellsYourGoods', headerName: 'Продает ваших товаров', flex: 0.25 },
        {
            field: "action",
            headerName: "",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Typography sx={{whiteSpace: 'pre-wrap', cursor: 'pointer', color: '#757575'}}>Перейти в карточку дистрибьютора</Typography>
            )
        },
    ];

    return (
        <>
            {productData &&
            <Box>
                <Tabs
                    value={0}
                    sx={{mb: 5}}
                >
                    <Tab label={`По каталогу`} id='0' aria-controls={`panel-${0}`} />
                </Tabs>
                <CardHeader
                    title={productData.name}
                    avatar={
                        <Box
                            component="img"
                            onError={imageOnErrorHandler}
                            src={productData.picturePath || placeholder}
                        />
                    }
                    action={
                        <Button
                            color='primary'
                            variant='contained'
                            disabled={selectionModel.length <= 0}
                            onClick={() => toOrder()}
                        >
                            Добавить в заказ
                        </Button>
                    }
                    sx={{ padding: '2.4rem', '& .MuiCardHeader-title':{maxWidth: '600px', mb: 0}, '& img':{maxHeight: '80px'} }}
                />
            </Box>
            }

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
                                    cost: item.cost,
                                    sellsYourGoods: item.sellsYourGoods,
                                    name: item.vendor.name,
                                    condition: item.condition,
                                }
                            ))}
                        rowHeight={96}
                        selectionModel={selectionModel}
                        hideFooterSelectedRowCount
                        onSelectionModelChange={(selection) => {
                            if (selection.length > 1) {
                                const selectionSet = new Set(selectionModel);
                                const result = selection.filter((s) => !selectionSet.has(s));
                                setSelectionModel(result);
                            } else if(selectionModel[0] === selection[0]) {
                                setSelectionModel([])
                            } else {
                                setSelectionModel(selection);
                            }
                        }}
                        //onRowClick={someEventHandler}
                    />
            }
        </>
    );
});

export default DistributorProduct;