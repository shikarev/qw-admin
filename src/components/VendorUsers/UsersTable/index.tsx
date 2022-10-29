import React, { SyntheticEvent } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Typography, CardHeader } from '@mui/material';
import { ReactComponent as TrashCan } from '../../../assets/icons/delete.svg?svgr';
import { ReactComponent as EditIcon } from '../../../assets/icons/outlined/edit.svg?svgr';
import { ReactComponent as PeopleIcon } from '../../../assets/icons/outlined/people.svg?svgr';
import { Link, useNavigate } from 'react-router-dom';
import {useDeleteUserMutation, useGetVendorUsersQuery} from '../../../api/vendors';
import {useAppSelector} from "../../../store/hooks";
import {getSelectedShop} from "../../../store/shops";
import {WithTable} from "../../FeedbackAndQuestions/VendorFeedback/Feedbacks";

const UsersTable = WithTable((props) => {
  const navigate = useNavigate();

  const Table = props.table;

  const vendorId = useAppSelector(getSelectedShop);

  const { data, isLoading, error } = useGetVendorUsersQuery({ id: vendorId?.vendor.id || '', page: props.page, limit: props.limit }, {skip: !vendorId});

  const [removeUser] = useDeleteUserMutation()

  console.log(data)

  const columns: GridColDef[] = [
    {
      field: 'user',
      headerName: 'Сотрудник',
      sortable: false,
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '2.2rem' }}>
        <img src={params.row.role.picturePath}
             style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }}
             alt={params.row.role.picturePath} />
        <Typography variant='h6' sx={{ ml: 3 }}>{params.row.user.name}</Typography>
      </Box>
    },
    { field: 'position', headerName: 'Должность', flex: 0.25, renderCell: (params) => params.row.role.id },
    {
      field: 'role',
      headerName: 'Роль',
      flex: 0.15,
      renderCell: (params) => params.row.role.name
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
          navigate(`../edit/${params.row.user.id}` );
        };
        return (
            <>
              {params.row.role.id === 'ADMIN' ? null :
              <Box sx={{ 'button:not(:last-of-type)': { mr: 3 } }}>
                <IconButton size='small' onClick={handleEdit}>
                  <EditIcon />
                </IconButton>

                <IconButton size='small' onClick={() => removeUser(params.row.id)}>
                  <TrashCan />
                </IconButton>
              </Box>}
            </>
        );
      },
    }
  ];

  return (
    <>
      <Box>
        <CardHeader
          title='Сотрудники'
          subheader='Контроль и редактирование магазинов'
          avatar={<PeopleIcon />}
          action={
            <Link to='add'>
              <Button color='primary' variant='contained'>Добавить сотрудника</Button>
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
                formattedData={data.data ?? []}
                rowHeight={96}
                disableSelectionOnClick
            />
      }
    </>
  );
});

export default UsersTable;