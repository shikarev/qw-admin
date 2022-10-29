import React, {useEffect, useState} from 'react';
import {Avatar, Box} from "@mui/material";
import TextField from "../../../../common/TextField";
import {useFormik} from "formik";
import {useAppSelector} from "../../../../../store/hooks";
import {getSelectedShop} from "../../../../../store/shops";
import {useNavigate} from "react-router-dom";
import {useAddFeedbackNoteMutation} from "../../../../../api/feedback";

const AnswerForm = (props: any) => {
    const vendor = useAppSelector(getSelectedShop);
    const [vendorId, setVendorId] = useState('');
    const navigate = useNavigate();
    const [addNote] = useAddFeedbackNoteMutation();

    useEffect(() => {
        // GO BACK if vendor changed
        if (vendor?.vendor?.id) {
            if (vendorId && vendorId !== vendor.vendor.id) {
                navigate('../')
            } else {
                setVendorId(vendor.vendor.id)
            }
        }
    }, [vendor])

    const formik = useFormik({
        initialValues: {
            note: ''
        },

        onSubmit: (values, actions) => {
            actions.setSubmitting(true);
            addNote({feedback: props.id, note: values.note})
                .then(r => {
                    if ('error' in r) {
                        // Handle error
                    } else {
                        actions.resetForm();

                    }
                })
                .finally(() => {
                    actions.setSubmitting(false)
                })
        }
    });

    return (
        <Box sx={{display: 'flex'}}>
            <Avatar src={vendor?.vendor.picturePath} sx={{
                border: 'solid 1px',
                borderColor: 'secondary.main',
                width: '44px',
                height: '44px',
                mr: 3
            }}>{vendor?.vendor.name.slice(0, 1)}</Avatar>
            <form onSubmit={formik.handleSubmit} style={{width: '60%'}}
                  id='vendor_feedback'>
                <TextField formik={formik} id='note'
                           inputProps={{
                               placeholder: 'Ответьте на отзыв...',
                               multiline: true,
                               maxRows: 20,
                           }}/>
            </form>
        </Box>
    );
};

export default AnswerForm;