import React from 'react';
import { Box, Button, CardHeader, Grid } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import FormWrapper from '../../common/FormWrapper';
import FormInput from '../../common/FormInput';
import DocDropZone from '../../common/DocDropZone';
import PictureDropZone from '../../common/PictureDropZone';
import { FormikProps } from 'formik';
import {useGetDocumentsTypeQuery, useGetOrgFormsTypeQuery} from '../../../api/vendors';
import TextField from '../../common/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface IShopForm {
  formik: FormikProps<any>;
  title: string;
  subHeader?: string;
  buttonName?: string;
}

const ShopForm = ({formik, title, subHeader, buttonName}:IShopForm) => {
  const {data: DocTypes} = useGetDocumentsTypeQuery({});
  const {data: OrgFormTypes} = useGetOrgFormsTypeQuery({});

  return (
    <Box sx={{backgroundColor: 'secondary.light', borderRadius: '3.2rem', padding: '2.4rem'}}>
      <form onSubmit={formik.handleSubmit}
            id='createShop'
      >
        <CardHeader
          sx={{padding: '0 2.4rem 2.4rem 2.4rem', flexWrap: 'wrap', '& div:not(:last-child)': {marginBottom: '1rem'}}}
          title={title}
          subheader={subHeader}
          action={
            <Button
              color="primary"
              variant="outlined"
              type="submit"
              disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            >
              {buttonName ?? 'Сохранить'}
            </Button>
          }
        />

        <Grid container spacing={5}>
          <Grid item sm={12} xs={12} md={6} lg={6}>
            <FormWrapper title="Основная информация">
              <FormInput label="Название (торговое)" req>
                <MuiTextField
                  id="name"
                  name="name"
                  placeholder="Название магазина"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FormInput>

              <FormInput label="Орг. форма" req>
                <Select
                    displayEmpty
                    fullWidth
                    inputProps={{ 'aria-label': 'Without label' }}
                    id="orgForm"
                    name="orgForm"
                    onChange={formik.handleChange}
                    value={formik.values.orgForm}
                >
                  {OrgFormTypes?.data.map(item =>
                      <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                  )}
                </Select>
              </FormInput>

              <FormInput label="ИНН">
                <MuiTextField
                  id="inn"
                  name="inn"
                  placeholder="Укажите ИНН магазина"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.inn}
                  helperText={formik.touched.inn && formik.errors.inn}
                />
              </FormInput>

              <FormInput label="Почта">
                <MuiTextField
                  id="email"
                  name="email"
                  placeholder="Введите ваш e-mail"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormInput>

              <FormInput label="Описание">
                <MuiTextField
                  id="description"
                  name="description"
                  placeholder="Пример: Спортивная обувь предназначенная для..."
                  variant="outlined"
                  multiline
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </FormInput>

              <FormInput label="Документы магазина">
                {DocTypes && DocTypes.map(item =>
                  <DocDropZone title={item.name} key={item.id} id={item.id} />
                )}
              </FormInput>
            </FormWrapper>
          </Grid>

          <Grid item sm={12} xs={12} md={6} lg={6}>
            <FormWrapper title="Логотип и фотографии магазина">
              <PictureDropZone
                multiple={false}
                firstTitle='Логотип'
              />
              <FormInput label="Ссылка на логотип">
                <TextField
                  id='picturePath'
                  formik={formik}
                  inputProps={{placeholder:"url картинки..."}}
                />
              </FormInput>
            </FormWrapper>

            <FormWrapper title="Дополнительные данные">
              <FormInput label="Телефон">
                <MuiTextField
                  id="phone"
                  name="phone"
                  placeholder="Введите номер телефона"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </FormInput>

              <FormInput label="Сайт">
                <MuiTextField
                  id="site"
                  name="site"
                  placeholder="Вставьте ссылку на сайт"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.site}
                  helperText={formik.touched.site && formik.errors.site}
                />
              </FormInput>

              <FormInput label="Время работы">
                <MuiTextField
                  id="openingHours"
                  name="openingHours"
                  placeholder="Напишите часы работы"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.openingHours}
                  helperText={formik.touched.openingHours && formik.errors.openingHours}
                />
              </FormInput>
            </FormWrapper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ShopForm;