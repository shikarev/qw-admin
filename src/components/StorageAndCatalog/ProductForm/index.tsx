import React, {ChangeEvent} from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {
    Autocomplete,
    Box,
    Button,
    CardHeader,
    CircularProgress,
    Grid,
    makeStyles,
    Typography,
    useTheme
} from '@mui/material';
import {useGetCategoriesQuery, useGetManufacturersQuery} from '../../../api/products';
import {useAppDispatch} from '../../../store/hooks';
import {addVendorProduct} from '../../../store/product';
import FormWrapper from '../../common/FormWrapper';
import PictureDropZone from '../../common/PictureDropZone';
import {ReactComponent as DropdownIcon} from '../../../assets/icons/arrow-down.svg?svgr';
import {useNavigate} from 'react-router-dom';
import FormInput from '../../common/FormInput';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import TextField from '../../common/TextField';
import MuiTextField from '@mui/material/TextField';
import useDebounce from '../../../utils/useDebounce';

const CreateProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('Обязательно для заполнения'),
    description: Yup.string()
        .required('Обязательно для заполнения'),
    category: Yup.string()
        .required('Обязательно для заполнения'),
    manufacturer: Yup.string()
        .required('Обязательно для заполнения'),
    cost: Yup.string()
        .required('Обязательно для заполнения'),
    oldCost: Yup.string()
        .required('Обязательно для заполнения'),
    startDate: Yup.string()
        .required('Обязательно для заполнения'),
    endDate: Yup.string()
        .required('Обязательно для заполнения')
});

const ProductForm = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const [openBrands, setOpenBrands] = React.useState(false);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const debouncedQuery = useDebounce(query, 500);
    const {data: brands, isFetching: brandsLoading} = useGetManufacturersQuery(debouncedQuery);
    const {data: categories, isFetching: categoriesLoading} = useGetCategoriesQuery();
    let navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            manufacturer: '',
            category: '',
            description: '',
            name: '',
            cost: 0,
            oldCost: 0,
            startDate: new Date(),
            endDate: new Date()
        },
        validationSchema: CreateProductSchema,
        onSubmit: (values: any, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(addVendorProduct(values)).then((r) => {
                if (!('error' in r)) {
                    setSubmitting(false);
                    navigate('../', {replace: true});
                }
                setSubmitting(false);
            });
        }
    });

    const setBrandValue = (newValue: any) => {
        formik.setFieldValue('manufacturer', newValue.id);
    };
    const setCategoryValue = (newValue: any) => {
        formik.setFieldValue('category', newValue.id);
    };

    function handleBrandsInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setQuery(e.target.value);
    }

    return (
        <Box sx={{
            backgroundColor: 'secondary.light',
            borderRadius: '3.2rem',
            padding: '2.4rem',
            opacity: formik.isSubmitting ? 0.5 : 1
        }}>
            <form onSubmit={formik.handleSubmit}
                  id='createProduct'
            >
                <CardHeader
                    sx={{
                        padding: '0 2.4rem 2.4rem 2.4rem',
                        flexWrap: 'wrap',
                        '& div:not(:last-child)': {marginBottom: '1rem'}
                    }}
                    title='Добавить новый продукт'
                    subheader='Заполните поля в соответствии с подсказками'
                    action={
                        <Button
                            color='primary'
                            variant='outlined'
                            type='submit'
                            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                        >
                            Отправить на модерацию
                            {formik.isSubmitting && <CircularProgress size={20}/>}
                        </Button>
                    }
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <FormWrapper title='Основная информация'>
                            <FormInput label='Hаименование'>
                                <TextField
                                    id='name'
                                    inputProps={{placeholder: 'Nike Air Force...'}}
                                    formik={formik}
                                />
                            </FormInput>
                            <Grid container spacing={2} sx={{mb: 5}}>
                                <Grid item xs={12} md={9}>
                                    <FormInput label='Категория'>
                                        <Autocomplete
                                            id='category'
                                            disableClearable

                                            fullWidth
                                            open={openCategory}
                                            onOpen={() => {
                                                setOpenCategory(true);
                                            }}
                                            onClose={() => {
                                                setOpenCategory(false);
                                            }}
                                            onChange={(event, newValue) => {
                                                setCategoryValue(newValue);
                                            }}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            getOptionLabel={(option) => option.name}
                                            options={categories?.data ?? []}
                                            loading={categoriesLoading}
                                            popupIcon={<DropdownIcon style={{
                                                width: '16px',
                                                height: '16px',
                                                color: theme.palette.text.primary
                                            }}/>}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    {...params}
                                                    variant='outlined'
                                                    placeholder='Выбрать...'
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            padding: '5px !important',
                                                            paddingRight: '0 !important'
                                                        }, '& .MuiAutocomplete-endAdornment': {
                                                            position: 'relative'
                                                        }, '& .MuiIconButton-root': {p: 2}
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {categoriesLoading ? <CircularProgress color='inherit'
                                                                                                       size={20}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormInput>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormInput label='Пол'>
                                        <TextField
                                            inputProps={{disabled: true, placeholder: 'Выбрать...'}}
                                            sx={{flexBasis: '25%'}}
                                            id='sex'
                                            formik={formik}
                                        />
                                    </FormInput>
                                </Grid>
                            </Grid>

                            <FormInput label='Бренд'>
                                <Autocomplete
                                    id='manufacturer'
                                    open={openBrands}
                                    onOpen={() => setOpenBrands(true)}
                                    onClose={() => setOpenBrands(false)}
                                    onChange={(event, newValue) => {
                                        setBrandValue(newValue);
                                    }}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name}
                                    options={brands?.data ?? []}
                                    loading={brandsLoading}
                                    popupIcon={<DropdownIcon
                                        style={{width: '16px', height: '16px', color: theme.palette.text.primary}}/>}
                                    disableClearable
                                    fullWidth
                                    renderInput={(params) => (
                                        <MuiTextField
                                            onChange={handleBrandsInput}
                                            {...params}
                                            variant='outlined'
                                            placeholder='Поиск...'
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    padding: '5px !important',
                                                    paddingRight: '0 !important'
                                                }, '& .MuiAutocomplete-endAdornment': {
                                                    position: 'relative'
                                                }, '& .MuiIconButton-root': {p: 2}
                                            }}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {brandsLoading ?
                                                            <CircularProgress color='inherit' size={20}/> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                )
                                            }}
                                        />
                                    )}
                                />
                            </FormInput>
                            <FormInput label='Классификация'>
                                <TextField
                                    id='class'
                                    formik={formik}
                                    inputProps={{disabled: true, placeholder: 'Выбрать...'}}
                                />
                            </FormInput>
                            <FormInput label='Теги'>
                                <TextField
                                    id='tags'
                                    inputProps={{placeholder: 'Выберите теги...', disabled: true}}
                                    formik={formik}
                                />
                            </FormInput>
                            <FormInput label='Описание'>
                                <TextField
                                    id='description'
                                    inputProps={{placeholder: 'Пример: Спортивная обувь предназначенная для...'}}
                                    formik={formik}
                                />
                            </FormInput>
                            <Grid container spacing={2} sx={{mb: 5}}>
                                <Grid item xs={12} md={6}>
                                    <FormInput label='Цена'>
                                        <TextField
                                            id='oldCost'
                                            inputProps={{placeholder: 'Цена'}}
                                            formik={formik}
                                        />
                                    </FormInput>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormInput label='Цена со скидкой'>
                                        <TextField
                                            id='cost'
                                            inputProps={{placeholder: 'Цена со скидкой'}}
                                            formik={formik}
                                        />
                                    </FormInput>
                                </Grid>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                                    <Grid item xs={12} md={6}>
                                        <FormInput label='Цена действует с'>
                                            <MobileDatePicker
                                                inputFormat='dd.MM.yyyy'
                                                cancelText='Отмена'
                                                okText='Сохранить'
                                                toolbarTitle='Выберите дату'
                                                value={formik.values.startDate}
                                                onAccept={e => formik.setFieldValue('startDate', new Date(e))}
                                                onChange={() => {
                                                }}
                                                renderInput={(params) => <MuiTextField {...params} sx={{width: 1}}/>}
                                            />
                                        </FormInput>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInput label='Цена действует до'>
                                            <MobileDatePicker
                                                inputFormat='dd.MM.yyyy'
                                                cancelText='Отмена'
                                                okText='Сохранить'
                                                toolbarTitle='Выберите дату'
                                                value={formik.values.endDate}
                                                onAccept={e => formik.setFieldValue('endDate', new Date(e))}
                                                onChange={() => {
                                                }}
                                                renderInput={(params) => <MuiTextField {...params} sx={{width: 1}}/>}
                                            />
                                        </FormInput>
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                            <FormInput label='Остаток'>
                                <TextField
                                    id='quantity'
                                    formik={formik}
                                    inputProps={{disabled: true}}
                                />
                            </FormInput>
                        </FormWrapper>

                        <FormWrapper title='Связанные товары'>
                            <Typography variant='h6' sx={{marginBottom: '.8rem'}}>Товары</Typography>
                            <TextField
                                id='linked'
                                inputProps={{placeholder: 'Выбрать...'}}
                                formik={formik}
                            />
                        </FormWrapper>

                        <FormWrapper title='Доставка'>
                            <Typography variant='h6' sx={{marginBottom: '.8rem'}}>Компания</Typography>
                            <TextField
                                id='delivery'
                                inputProps={{placeholder: 'Выбрать...'}}
                                formik={formik}
                            />
                        </FormWrapper>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormWrapper title='Фотографии и видео продукта'>
                            <PictureDropZone
                                multiple={true}
                                firstTitle='Главная'
                            />
                        </FormWrapper>
                        <FormWrapper title='Характеристики'>
                            <Typography variant='h6' color='gray' sx={{textAlign: 'center'}}>
                                Появятся когда вы выберите категория продукта...
                            </Typography>
                        </FormWrapper>
                        <FormWrapper title='Условия'>
                            <Typography variant='h6' color='gray' sx={{textAlign: 'center'}}>
                                Создайте условия изменения конфигураций продукта
                                при определенных обстоятельствах...
                            </Typography>
                        </FormWrapper>
                    </Grid>

                </Grid>
            </form>
        </Box>
    )
        ;
};

export default ProductForm;