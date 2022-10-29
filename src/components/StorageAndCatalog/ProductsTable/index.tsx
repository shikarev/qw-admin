import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { productsApi, useGetProductsQuery } from '../../../api/products';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Typography,  CardHeader, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as TrashCan } from '../../../assets/icons/delete.svg?svgr';
import { ReactComponent as EditIcon } from '../../../assets/icons/outlined/edit.svg?svgr';
import { ReactComponent as MoreIcon } from '../../../assets/icons/outlined/more_three.svg?svgr';
import { ReactComponent as RefreshIcon } from '../../../assets/icons/outlined/refresh.svg?svgr';
import { ReactComponent as MoreVertIcon } from '../../../assets/icons/outlined/more_vert.svg?svgr';
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";

const ProductsTable = WithTable((props) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(0);
  const { data, isLoading, error } = useGetProductsQuery({
    id: props.vendorId,
    params: { page: props.page, limit: props.limit }
  }, { skip: !props.vendorId });
  const Table = props.table;

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Название',
      sortable: false,
      minWidth: 200,
      flex: 0.4,
      renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center' ,                       width: '100%',
        '& .MuiTypography-root': {
          whiteSpace: 'pre-wrap',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: 4,
          lineHeight: 1.2,
        } }}>
        <img src={params.row.picturePath}
             style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
        <Typography variant='h6' sx={{ ml: 3 }}>{params.formattedValue}</Typography>
      </Box>
    },
    {
      field: 'status',
      headerName: 'Статус',
      flex: 0.25,
      renderCell: () => <Typography sx={{ color: 'green' }}>
        Активен
      </Typography>
    },
    { field: 'cost', headerName: 'Цена', flex: 0.25 },
    { field: 'old_cost', headerName: 'Цена со скидкой', flex: 0.25 },
    { field: 'quantity', headerName: 'Остаток', flex: 0.25 },
    {
      field: 'action',
      headerName: 'Действия',
      sortable: false,
      flex: 0.25,
      minWidth: 120,
      renderCell: (params) => {
        const onClick = (e: SyntheticEvent) => {
          e.stopPropagation(); // don't select this row after clicking
          dispatch(productsApi.endpoints.deleteProduct.initiate(params.row.productId));
        };
        return <Box sx={{ 'button:not(:last-of-type)': { mr: 5 } }}>
          <IconButton size='small' disabled onClick={() => {
            alert('В разработке');
          }}><EditIcon /></IconButton>
          <IconButton size='small' onClick={onClick}><TrashCan /></IconButton>
          <IconButton size='small' disabled onClick={() => {
            alert('В разработке');
          }}><MoreIcon /></IconButton>
        </Box>;
      }
    }
  ];

  return (
    <>
      <Tabs
        value={0}
        sx={{mb: 5}}
      >
        <Tab label={`Все (${data?.total ?? 0})`} id='0' aria-controls={`panel-${0}`}/>
      </Tabs>
      <CardHeader
        sx={{ padding: '0 2.4rem 2.4rem 2.4rem', flexWrap: 'wrap', '& div:not(:last-child)': { marginBottom: '1rem' } }}
        title='Список продуктов'
        subheader='Список продуктов магазина'
        action={
          <Link to='add'>
            <Button variant='outlined'>Добавить продукт</Button>
          </Link>
        }
      />
      {
        error ? <Typography>Ошибка запроса</Typography> :
          data && data.data &&
          <>
            <Box sx={{pl: 5, pr: 5, pb: 5, display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{'button:not(:first-of-type)': {ml: 5}}}>
                <IconButton size='small' ><RefreshIcon/></IconButton>
                <IconButton size='small' disabled><MoreVertIcon/></IconButton>
              </Box>
              <Box sx={{ display: 'flex', 'h6:not(:first-of-type)':{ml: 3} }}>
                <Typography variant='h6'>{`Выбрано: ${selected}`}</Typography>
                <Typography variant='h6' sx={{color: 'text.secondary'}}>{`Всего продуктов: ${data.total}`}</Typography>
              </Box>

            </Box>
            <Table
                isFetching={isLoading}
                data={data}
                columns={columns}
                formattedData={data.data.map(item => ({...item.product, id: item.id}))}
                rowHeight={96}
            />
          </>
      }
    </>
  );
});

export default ProductsTable;