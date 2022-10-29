import React from 'react';
import { InputBaseComponentProps, SxProps } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { FormikProps } from 'formik';

interface ITextField {
  inputProps?: InputBaseComponentProps;
  formik: FormikProps<any>;
  id: string;
  sx?: SxProps;
}

const TextField = ({formik, id, inputProps, sx}:ITextField) => {
  return (
    <MuiTextField
      sx={sx}
      id={id}
      name={id}
      fullWidth
      variant='outlined'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      helperText={formik.touched[id] && formik.errors[id]}
      error={!!(formik.touched[id] && formik.errors[id])}
      inputProps={inputProps}
    />
  );
};

export default TextField;