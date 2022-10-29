import React, {useEffect, useState} from 'react';
import { WithTable } from '../../FeedbackAndQuestions/VendorFeedback/Feedbacks';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {getProducts, getSelectedProductOffer,} from '../../../store/distributor';
import { ReactComponent as Phone } from '../../../assets/icons/outlined/phone.svg?svgr';
import { ReactComponent as Chat } from '../../../assets/icons/outlined/chat.svg?svgr';
import { ReactComponent as Mail } from '../../../assets/icons/outlined/email.svg?svgr';
import { ReactComponent as Server } from '../../../assets/icons/outlined/server.svg?svgr';
import { ReactComponent as FilterIcon } from '../../../assets/icons/outlined/filter.svg?svgr';
import { useFormik } from 'formik';
import { getSelectedShop } from '../../../store/shops';
import { useCreateOfferMutation, useEditOfferMutation } from '../../../api/distributors';
import CounterButtons from './CounterButtons';
import { useNavigate } from 'react-router-dom';

const DistributorProductsOffer = WithTable((props) => {

  const Table = props.table;

  const navigate = useNavigate();

  const productsList = useAppSelector(getProducts)

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productsList) {
      setProducts(productsList)
    }
  }, [productsList])

  const SelectedProductOffer = useAppSelector(getSelectedProductOffer)
  const vendorId = useAppSelector(getSelectedShop)?.vendor.id;

  const min = 1;
  const max = 999;

  const [ value, setValue ] = useState(min);
  const [ error, setError ] = useState(false)

  const [ createOffer ] = useCreateOfferMutation()

  let productOffer = {
    pageCount: 1,
    total: 1,
    data: products,
  }

  const [ editOffer ] = useEditOfferMutation()

  const formik = useFormik({
    initialValues: {
      promo: 'xxx',
      description: 'zdarovaorli@qwangy.com',
      note: 'Шлагбаум в арке, позвонить по номеру',
      name: 'Тестовый Тест',
      delivery_way: '91deb0bc-7867-48b7-9f10-38143fbd6cda',
      payment_method: 'c46f8dc6-201b-4f52-9055-97d380c07702',
      delivery_type: 'pickup',
      bank_card: '9070de69-ea80-4f1a-b6cb-696a3b42914d',
      recipient: '06479da8-f47f-4f9c-9a92-63a8c4431ea5',
      distributor: SelectedProductOffer.selectedDistributorOffer.vendor.id,
      shop: vendorId,
      order_products: [
        {
          quantity: 1,
          order_by: '1',
          vendor_point: '017d477c-7e92-f5ab-9b82-e60710b3c591',
          distributor_offer: SelectedProductOffer.selectedDistributorOffer.id,
        },
        /*{
            quantity: 1,
            order_by: "1",
            vendor_point:"017d477c-7e92-f5ab-9b82-e60710b3c591",
            distributor_offer: '03e4bb3b-09a7-4fae-aa2d-b32ee6fdf7cc',
        },*/
      ]
    },
    enableReinitialize: true,
    onSubmit: (values: any, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2))
      createOffer(values).then((r) => {
        if ('error' in r) {
          setError(true)
        }

        if ('data' in r) {
          //resetForm();
          if (r.data.id) {
            editOffer({ id: r.data.id, data: { ...values, 'status': 'active' } }).then(() => {
              navigate(`/distributor_orders`);
            })
          }
          //navigate(`/distributor_orders`);
        }
      })
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Название товара',
      sortable: false,
      minWidth: 200,
      flex: 0.35,
      renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', pl: '2.2rem' }}>
        <Typography variant="h6" sx={{ whiteSpace: 'pre-wrap' }}>{params.formattedValue}</Typography>
      </Box>
    },
    { field: 'mod', headerName: 'Модификация товара', flex: 0.15 },
    { field: 'productExistence', headerName: 'Остатки', flex: 0.1 },
    { field: 'offPrice', headerName: 'Закупочная цена', flex: 0.1 },
    { field: 'retailPrice', headerName: 'Розничная цена', flex: 0.1 },
    { field: 'price', headerName: 'Цена', flex: 0.1 },
    {
      field: 'count',
      headerName: 'Количество',
      flex: 0.25,
      renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '2.2rem' }}>
        {/*<img src={params.row.role.picturePath}
                     style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }}
                     alt={params.row.role.picturePath} />*/}
        {/*<Typography variant='h6' sx={{ ml: 3 }}>кря</Typography>*/}
        <CounterButtons value={value} />
      </Box>
    },
  ];

  return (
    <>

      <Box sx={{ p: '2.4rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box>
            {SelectedProductOffer &&
              <Box sx={{ display: 'flex', '& svg:not(:last-child)': { mr: '2.8rem' } }}>
                <Typography sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  mr: '4rem'
                }}>{SelectedProductOffer.selectedDistributorOffer.vendor.name}</Typography>
                <Chat />
                <Mail />
                <Phone />
              </Box>
            }
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Server />
            <Button variant="text" startIcon={<FilterIcon />} color="secondary" sx={{
              color: '#757575',
              p: '.8rem 2rem',
              '&.MuiButton-root:hover': { backgroundColor: 'transparent', color: '#1A202C' }
            }}>Фильтры</Button>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>Данные по дистрибьютору</Typography>
      </Box>


      <form onSubmit={formik.handleSubmit}>

        {productOffer && productOffer.data &&
          <Table
            isFetching={true}
            data={productOffer}
            columns={columns}
            formattedData={
              productOffer.data.map(item => (
                {
                  ...item,
                  id: item.product.id,
                  name: item.product.name,
                  //mod: item.selectedDistributorProduct.mod,
                  productExistence: item.productExistence,
                  //optPrice: item.selectedDistributorProduct.optPrice,
                  retailPrice: item.retailPrice,
                  price: item.purchasePrice,

                }
              ))}
            rowHeight={96}
            disableSelectionOnClick
            pageSize={3}
            hideFooterPagination
          />
        }


        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: '2.4rem', alignItems: 'center' }}>
          {error &&
            <Typography sx={{ mr: '2rem', color: 'red', fontWeight: 600 }}>Количество товара не доступно для
              покупки или его нет в наличии</Typography>}
          <Button variant="contained" color="primary" type="submit">
            Оформить заказ
          </Button>
        </Box>
      </form>
    </>
  );
});

export default DistributorProductsOffer;
