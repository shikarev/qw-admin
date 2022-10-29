import React, { SyntheticEvent } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import {Box, Button, IconButton, Typography, CardHeader} from '@mui/material';
import { ReactComponent as TrashCan } from '../../../assets/icons/delete.svg?svgr';
import { ReactComponent as EditIcon } from '../../../assets/icons/outlined/edit.svg?svgr';
import { ReactComponent as ShopBlack } from '../../../assets/icons/outlined/shop.svg?svgr';
import { ReactComponent as PeopleIcon } from '../../../assets/icons/outlined/people.svg?svgr';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMyShopsQuery } from '../../../api/vendors';
import moment from 'moment/moment';
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";

const VendorsTable = WithTable((props) => {
  const navigate = useNavigate();

  const Table = props.table;

  const { data, isLoading, error } = useGetMyShopsQuery({ page: props.page, limit: props.limit });

  const isShopLimit = data && data.total > 1

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Название',
      sortable: false,
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', pl: '2.2rem' }}>
        <img src={params.row.picturePath}
             style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }}
             alt={params.row.picturePath} />
        <Typography variant='h6' sx={{ ml: 3 }}>{params.formattedValue}</Typography>
      </Box>
    },
    { field: 'productsCount', headerName: 'Кол-во позиций', flex: 0.25 },
    { field: 'profit', headerName: 'Доход', flex: 0.15 },
    {
      field: 'created',
      headerName: 'Дата создания',
      flex: 0.35,
      renderCell: (params) => moment(params.row.created).format('DD.MM.YYYY')
    },
    {
      field: 'action',
      headerName: 'Действия',
      sortable: false,
      flex: 0.25,
      minWidth: 120,
      renderCell: (params) => {
        const handleEdit = (e: SyntheticEvent) => {
          e.stopPropagation(); // don't select this row after clicking
          //dispatch(productsApi.endpoints.deleteProduct.initiate(params.row.id));
          navigate(`../edit/${params.row.id}` );
        };
        return <Box sx={{ 'button:not(:last-of-type)': { mr: 3 } }}>
          <IconButton size='small' onClick={handleEdit}><EditIcon /></IconButton>
          {/*<IconButton size='small' disabled onClick={() => {
            alert('В разработке');
          }}>
            <MoreIcon /></IconButton>*/}
          <IconButton
              disableRipple
              size='small'
              sx={{position: 'relative', width: '6.4rem', justifyContent: 'flex-start', '&:hover': {color: '#EB4F5A'}}}
          >
            <PeopleIcon />
            <Box sx={{position: 'absolute', top: 8, left: 28, fontSize: 12, fontWeight: 500, color: 'inherit'}}>(10)</Box>
          </IconButton>
          <IconButton size='small' disabled onClick={() => {
            alert('В разработке');
          }}><TrashCan /></IconButton>
        </Box>;
      },
    }
  ];

  return (
    <>

        <Box>
          <CardHeader
            title='Настройки магазина'
            subheader='Контроль и редактирование магазинов'
            avatar={<ShopBlack />}
            action={
                !isLoading &&
                <Link to={isShopLimit ? '' : 'add'}>
                  <Button color='primary' variant='contained' disabled={isShopLimit}>Создать магазин</Button>
                </Link>
            }
            sx={{ padding: '2.4rem' }}
          />
        </Box>

      {
        error ? <Typography>Ошибка запроса</Typography> :
          data && data.data &&
              <Table
                  isFetching={isLoading}
                  data={data}
                  columns={columns}
                  formattedData={data.data.map(item => item.vendor)}
                  rowHeight={96}
                  disableSelectionOnClick
              />
      }
    </>
  );
});

export default VendorsTable;