import React from 'react';
import { Box, Button, CardHeader, Grid } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import FormWrapper from '../../common/FormWrapper';
import FormInput from '../../common/FormInput';
import { FormikProps } from 'formik';
import {useGetVendorNativeTypeQuery} from '../../../api/vendors';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface IUserForm {
  formik: FormikProps<any>;
  title: string;
  subHeader?: string;
  buttonName?: string;
}

const UserForm = ({formik, title, subHeader, buttonName}:IUserForm) => {
  const {data: UsersRole} = useGetVendorNativeTypeQuery({});

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

        <Grid item sm={12} xs={12} md={12} lg={12}>
          <FormWrapper title="Основная информация">
              <FormInput label="ID пользователя" req>
                  <MuiTextField
                      id="user"
                      name="user"
                      placeholder="Название магазина"
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                      value={formik.values.user}
                      helperText={formik.touched.user && formik.errors.user}
                  />
              </FormInput>

              <FormInput label="Роль" req>
                  <Select
                      displayEmpty
                      fullWidth
                      inputProps={{ 'aria-label': 'Without label' }}
                      id="role"
                      name="role"
                      onChange={formik.handleChange}
                      value={formik.values.role}
                  >
                      {UsersRole?.map(item =>
                          <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                      )}
                  </Select>
              </FormInput>

              <FormInput label="Должность">
                  <MuiTextField
                      disabled
                      id="position"
                      name="position"
                      placeholder="Введите должность сотрудника"
                      variant="outlined"
                      fullWidth
                  />
              </FormInput>

              <FormInput label="Почта">
                  <MuiTextField
                      disabled
                      id="email"
                      name="email"
                      placeholder="Введите e-mail сотрудника"
                      variant="outlined"
                      fullWidth
                  />
              </FormInput>
          </FormWrapper>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;