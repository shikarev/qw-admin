import React, {useEffect, useState} from 'react';
import {DataGridProps, GridColDef, GridRowParams, ruRU} from "@mui/x-data-grid";
import {Box, CircularProgress, Pagination, Typography, useTheme} from "@mui/material";
import {useAppSelector} from "../../../../store/hooks";
import {getSelectedShop} from "../../../../store/shops";
import {useGetVendorFeedbackQuery} from "../../../../api/feedback";
import {DataGrid} from "../../../common/DataGrid";
import {ReactComponent as StarIcon} from '../../../../assets/icons/filled/star.svg?svgr';
import {ReactComponent as PlusIcon} from '../../../../assets/icons/outlined/plus_border.svg?svgr';
import {ReactComponent as MinusIcon} from '../../../../assets/icons/outlined/minus_border.svg?svgr';
import {ReactComponent as CommentIcon} from '../../../../assets/icons/outlined/comment.svg?svgr';
import {ReactComponent as CheckBox} from '../../../../assets/icons/outlined/checkbox.svg?svgr';
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";
import ColoredAvatar from "../../../common/ColoredAvatar";
import NoRowsOverlay from "../../../common/DataGrid/NoRowsOverlay";
import {MyShops} from "../../../../types/vendors";
import {ListResponse} from "../../../../types/api";

interface DataTableProps extends Omit<DataGridProps, 'rows'> {
    data: ListResponse<any>;
    isFetching: boolean;
    formattedData?: any[];
}

interface HOCProps {
    limit: number;
}

interface InjectedProps {
    page: number;
    vendor: MyShops;
    vendorId: string;
    table: React.FunctionComponent<DataTableProps>;
    setPage: any;
}

export function WithTable<T extends HOCProps>(Component: React.ComponentType<T & InjectedProps>) {

    const ComponentWithTable = (mainProps: T) => {
        const [page, setPage] = useState('1');
        const vendor = useAppSelector(getSelectedShop);
        const [vendorId, setVendorId] = useState('');

        const DataTable = (props: DataTableProps) => {
            return <DataGrid
                rowHeight={162}
                {...props}
                rows={props.formattedData ?? props.data.data}
                columns={props.columns}
                pageSize={mainProps.limit}
                rowsPerPageOptions={[10, 15, 25]}
                loading={props.isFetching}
                rowCount={props.data.total}
                onRowClick={props.onRowClick}
                autoHeight
                disableColumnMenu
                disableDensitySelector
                paginationMode='server'
                components={{
                    Pagination: Pagination,
                    //BaseCheckbox: () => <CheckBox />,
                    NoRowsOverlay: NoRowsOverlay
                }}
                componentsProps={{
                    pagination: {
                        sx: {mt: 6},
                        page: parseInt(page),
                        color: 'primary',
                        count: Math.ceil(props.data.total / mainProps.limit),
                        onChange: (event: React.ChangeEvent<unknown>, value: number) => setPage(value.toString())
                    },
                }}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            />
        }

        useEffect(() => {
            // reset if vendor changed
            if (vendor?.vendor?.id) {
                if (vendorId !== vendor.vendor.id) {
                    setVendorId(vendor.vendor.id)
                    setPage('1');
                }
            }
        }, [vendor])
        // @ts-ignore
        return <Component {...mainProps} page={page} vendor={vendor} limit={mainProps.limit} setPage={setPage}
                          vendorId={vendorId} table={DataTable}/>
    }
    return ComponentWithTable;
}

const Feedbacks = WithTable((props) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const {data, isFetching} = useGetVendorFeedbackQuery({
        id: props.vendorId,
        params: {page: props.page, limit: props.limit}
    }, {skip: !props.vendorId});

    const Table = props.table;

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Магазин',
            sortable: false,
            flex: 0.04,
            minWidth: 100,
            renderCell: () => <Box sx={{display: 'flex', flexDirection: 'column', p: '1.4rem'}}>
                <Box sx={{
                    background: `url(${props.vendor?.vendor?.picturePath})`,
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
                        {props.vendor?.vendor?.name}
                    </Typography>
                </Box>
            </Box>
        },
        {
            field: 'note',
            headerName: 'Отзыв',
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
                            WebkitLineClamp: 2,
                            lineHeight: 1.2,
                        },
                        '& > div': {display: 'flex', alignItems: 'center', m: '.4rem 0'},
                        '& svg': {flex: '0 0 16px', width: '16px', height: '16px', mr: 2}
                    }}>
                        {params.row.advantage &&
                            <Box sx={{}}>
                                <PlusIcon/><Typography>{params.row.advantage}</Typography>
                            </Box>
                        }
                        {params.row.disadvantage &&
                            <Box sx={{}}>
                                <MinusIcon/><Typography>{params.row.disadvantage}</Typography>
                            </Box>
                        }
                        {params.row.note &&
                            <Box sx={{}}>
                                <CommentIcon/><Typography>{params.row.note}</Typography>
                            </Box>
                        }
                    </Box>
                )
            }
        },
        {
            field: 'userName',
            headerName: 'Автор',
            sortable: false,
            flex: 0.1,
            minWidth: 70,
            renderCell: (params) => {
                return (
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <ColoredAvatar name={params.formattedValue} picture={params.row.userPicturePath} size={32}
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
            field: 'rate',
            headerName: 'Оценка',
            sortable: false,
            flex: 0.04,
            minWidth: 90,
            renderCell: (params) => <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography sx={{fontSize: '1.2rem', mr: 1, lineHeight: 'unset'}}>
                    {params.formattedValue}
                </Typography>
                <StarIcon style={{width: '1.6rem', height: '1.6rem', color: theme.palette.warning.main}}/>
            </Box>
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
                {moment(params.formattedValue).format('DD.MM.YYYY hh:mm').split(' ').map((item, index) => (
                    <Typography key={index} sx={{fontSize: '1.2rem'}}>{item}</Typography>
                ))}
            </Box>
        },
    ];

    function handleRowClick(params: GridRowParams) {
        navigate(`${params.id}`);
    }

    return (
        <>
            {isFetching ? <Box sx={{
                    width: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10rem'
                }}><CircularProgress/></Box> :
                (data && props.vendor && data.data.length) ?
                <Table
                    data={data}
                    columns={columns}
                    isFetching={isFetching}
                    onRowClick={handleRowClick}
                />
                    :
                <Typography variant='h3'>Отзывов на магазин пока нет</Typography>
            }
        </>
    );
});

export default Feedbacks;