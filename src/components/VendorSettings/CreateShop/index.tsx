import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../store/hooks';
import { addVendor } from '../../../store/vendor';
import ShopForm from '../ShopForm';


const CreateShopSchema = Yup.object().shape({
  name: Yup.string()
    .required('Обязательно для заполнения'),
  orgForm: Yup.string()
    .required('Обязательно для заполнения'),
})

const CreateShop = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      orgForm: '',
      inn: '',
      email: '',
      description: '',
      phone: '',
      site: '',
      openingHours: '',
      picturePath: '',
    },
    validationSchema: CreateShopSchema,
    onSubmit: (values: any, {resetForm}) => {
      //alert(JSON.stringify(values, null, 2));
      //CreateShop(values);
      dispatch(addVendor(values)).then((r) => {
        if('error' in r){
          // ERROR HANDLE
        } else {
          resetForm();
        }
      });
    },
  });

  return (
    <ShopForm formik={formik} title='Создание нового магазина' subHeader='Заполните поля в соответствии с подсказками' buttonName="Отправить на модерацию"/>
  );
};

export default CreateShop;