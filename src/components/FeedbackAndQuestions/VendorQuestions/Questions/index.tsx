import React, {useState} from 'react';
import {GridColDef, GridRowParams} from "@mui/x-data-grid";
import {Box, CircularProgress, Pagination, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {getSelectedShop} from "../../../../store/shops";
import {DataGrid} from "../../../common/DataGrid";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";
import ColoredAvatar from "../../../common/ColoredAvatar";
import {useGetVendorQuestionsQuery} from "../../../../api/questions";
import {setSelectedQuestion} from "../../../../store/questions";
import NoRowsOverlay from "../../../common/DataGrid/NoRowsOverlay";

const Questions = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const vendor = useAppSelector(getSelectedShop);
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('4');

    const {data, isFetching} = useGetVendorQuestionsQuery({
        id: vendor?.vendor?.id,
        params: {page, limit}
    }, {skip: !vendor});

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Магазин',
            sortable: false,
            flex: 0.04,
            minWidth: 100,
            renderCell: () => <Box sx={{display: 'flex', flexDirection: 'column', p: '1.4rem'}}>
                <Box sx={{
                    background: `url(${vendor?.vendor?.picturePath})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left',
                    width: 'min(100%, 10.8rem)',
                    height: '3.2rem'
                }}/>
                <Box sx={{width: '100%', mt: 1}}>
                    <Typography sx={{
                        fontSize: '1.2rem',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 2,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {vendor?.vendor?.name}
                    </Typography>
                </Box>
            </Box>
        },
        {
            field: 'note',
            headerName: 'Вопрос',
            sortable: false,
            minWidth: 200,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Box sx={{
                        ml: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        '& p': {
                            fontSize: '1.2rem',
                            whiteSpace: 'pre-wrap',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 6,
                            lineHeight: 1.2,
                        }
                    }}>
                        {params.row.note &&
                            <Typography>{params.row.note}</Typography>
                        }
                    </Box>
                )
            }
        },
        {
            field: 'authorName',
            headerName: 'Автор',
            sortable: false,
            flex: 0.1,
            minWidth: 70,
            renderCell: (params) => {
                return (
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <ColoredAvatar name={params.formattedValue} picture={params.row.authorPicturePath} size={32}
                                       sx={{mr: 2}}/>
                        <Box sx={{overflow: 'hidden'}}>
                            <Typography sx={{
                                whiteSpace: 'pre-wrap',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                fontSize: '1.2rem'
                            }}>
                                {params.formattedValue}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'commentsCount',
            headerName: 'Статус',
            sortable: false,
            flex: 0.1,
            minWidth: 130,
            renderCell: (params) => params.row.commentsCount > 0
                ?
                <Typography sx={{
                    p: '.8rem 1rem',
                    borderRadius: '3.2rem',
                    backgroundColor: 'success.light',
                    color: 'success.main',
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    width: 'clamp(120px, 100%, 200px)',
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap'
                }}>Есть ответ</Typography>
                :
                <Typography color='primary' sx={{
                    p: '.8rem 1rem',
                    borderRadius: '3.2rem',
                    backgroundColor: 'primary.light',
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    width: 'clamp(120px, 100%, 200px)',
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap'
                }}>Ждет ответа</Typography>
        },
        {
            field: 'created',
            headerName: 'Дата',
            sortable: false,
            flex: 0.1,
            minWidth: 100,
            renderCell: (params) => <Box sx={{display: 'flex', flexDirection: 'column'}}>
                {moment(params.formattedValue).format('DD.MM.YYYY HH:mm').split(' ').map((item, index) => (
                    <Typography key={index} sx={{fontSize: '1.2rem'}}>{item}</Typography>
                ))}
            </Box>
        },
    ];

    function handleRowClick(params: GridRowParams) {
        //@ts-ignore
        dispatch(setSelectedQuestion(params.row));
        navigate(`${params.id}`);
    }

    return (
        <>
            {isFetching
                ? <Box sx={{
                    width: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10rem'
                }}><CircularProgress/></Box>
                : data && vendor && !!data.data.length
                    ? <DataGrid
                        rows={data.data}
                        columns={columns}
                        pageSize={parseInt(limit)}
                        rowsPerPageOptions={[10, 15, 25]}
                        loading={isFetching}
                        rowCount={data.total}
                        onPageSizeChange={(e) => setLimit(e.toString())}
                        onPageChange={(e) => setPage((e + 1).toString())}
                        onRowClick={handleRowClick}
                        rowHeight={162}
                        page={parseInt(page) - 1}
                        autoHeight
                        disableColumnMenu
                        disableDensitySelector
                        paginationMode='server'
                        components={{
                            Pagination: Pagination,
                            NoRowsOverlay: NoRowsOverlay
                        }}
                        componentsProps={{
                            pagination: {
                                sx: {mt: 6},
                                color: 'primary',
                                count: Math.ceil(data.total / parseInt(limit)),
                                onChange: (event: React.ChangeEvent<unknown>, value: number) => setPage((value).toString())
                            },
                            noRowsOverlay: {
                                title: 'Вопросов пока нет'
                            }
                        }}
                    />
                    : <Typography variant='h3'>Вопросов пока нет</Typography>
            }
        </>
    );
};

export default Questions;