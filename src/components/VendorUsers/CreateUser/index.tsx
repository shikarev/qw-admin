import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useAppSelector} from '../../../store/hooks';
import UserForm from "../UserForm";
import {getSelectedShop} from "../../../store/shops";
import {useInviteVendorUserMutation} from "../../../api/vendors";


const CreateUserSchema = Yup.object().shape({
  user: Yup.string()
    .required('Обязательно для заполнения'),
  role: Yup.string()
    .required('Обязательно для заполнения'),
})

const CreateUser = () => {

  const vendorId = useAppSelector(getSelectedShop);

  console.log(vendorId?.vendor.id)

  const [addUser] = useInviteVendorUserMutation()

  const formik = useFormik({
    initialValues: {
      user: '',
      role: '',
      orderBy: 1,
      status: 'active',
      vendor: vendorId?.vendor.id,
    },
    validationSchema: CreateUserSchema,
    enableReinitialize: true,
    onSubmit: (values: any, {resetForm}) => {
      //alert(JSON.stringify(values, null, 2));
      addUser(values);
      resetForm();

      /*dispatch(addVendor(values)).then((r) => {
        if('error' in r){
          // ERROR HANDLE
        } else {
          resetForm();
        }
      });*/
    },
  });

  return (
    <UserForm formik={formik} title='Добавить сотрудника' subHeader='Заполните поля в соответствии с подсказками' buttonName='Пригласить' />
  );
};

export default CreateUser;