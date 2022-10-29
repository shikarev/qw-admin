import {styled} from '@mui/material';
import {DataGrid as MuiDataGrid} from '@mui/x-data-grid';

export const DataGrid = styled(MuiDataGrid)(({theme}) => ({
    fontFamily: 'Inter !important',
    border: 'none !important',
    '& .MuiDataGrid-main': {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '32px',
        padding: '0 24px 24px 24px',
    },
    '& .MuiDataGrid-columnHeaders': {
        borderBottom: 'none',
        marginLeft: '24px',
        color: theme.palette.text.secondary,
        '& svg': {
            //color: theme.palette.text.secondary,
            //color: 'transparent'
            fontSize: '1.6rem'
        },

    },
    '& .MuiDataGrid-columnHeader': {
        '&:focus, &:focus-within': {
            outline: 'none'
        },
    },
    '& .MuiDataGrid-columnHeaderTitle' : {
        fontSize: '12px',
        lineHeight: '15px',
        whiteSpace: 'pre-wrap',
        maxWidth: '16rem'
    },
    '& .PrivateSwitchBase-root svg': {
        width: '18px',
        height: '18px',
        padding: 0,
        color: theme.palette.secondary.main,
    },
    '& .MuiDataGrid-columnSeparator': {
        display: 'none'
    },
    '& .MuiDataGrid-row': {
        background: theme.palette.background.default,
        '&:hover': {
            background: theme.palette.secondary.main,
            '& svg': {
                color: 'white',
            }
        },
        '&.Mui-selected': {
            backgroundColor: 'unset',
            '& .MuiDataGrid-cell': {
                borderBottom: '1px solid transparent'
            },
            '&:hover': {
                background: theme.palette.secondary.main
            },
        },
        '&:last-of-type': {
            '& .MuiDataGrid-cell': {
                borderBottom: 'none'
            }
        }
    },
    '& .MuiDataGrid-cell': {
        borderColor: theme.palette.secondary.main,
        fontFamily: 'Inter',
        fontSize: 12,
        '&:focus, &:focus-within': {
            outline: 'none!important',
        },
    },
    '& .MuiDataGrid-virtualScroller': {
        borderRadius: '24px'
    }
}))