import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { useFormik } from 'formik';
import { editVendor } from '../../../store/vendor';
import * as Yup from 'yup';
import ShopForm from '../ShopForm';
import { useGetVendorQuery } from '../../../api/vendors';

const EditShopSchema = Yup.object().shape({
  name: Yup.string()
    .required('Обязательно для заполнения'),
  orgForm: Yup.string()
    .required('Обязательно для заполнения')
});

const EditShop = () => {
  const { vendorId } = useParams();

  const { data } = useGetVendorQuery(vendorId ?? '', { skip: !vendorId });
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
      orgForm: data?.orgForm?.id ?? '',
      inn: data?.inn ?? '',
      email: data?.email ?? '',
      description: data?.description ?? '',
      phone: data?.phone ?? '',
      site: data?.site ?? '',
      openingHours: data?.openingHours ?? '',
      picturePath: data?.picturePath ?? ''
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: EditShopSchema,
    onSubmit: (values: any, { resetForm }) => {
      dispatch(editVendor({ id: vendorId, data: values })).then((r) => {
        if ('error' in r) {
          // ERROR HANDLE
        } else {
          resetForm();
          navigate('../', { replace: true });
        }
      });
    }
  });


  return (
    <>{
      data && <ShopForm formik={formik} title={`Редактирование ${data.name}`}
                       subHeader='Заполните поля в соответствии с подсказками' />
    }</>
  );
};

export default EditShop;