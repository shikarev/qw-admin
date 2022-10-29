import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

interface IOverviewItem {
    label: string;
    count: number;
    waiting: number;
}

const OverviewHeader = () => (
    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
        <Typography sx={{flex: '0 0 33%'}}/>
        <Typography sx={{
            flex: '0 0 33%',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: '500',
            color: 'secondary.dark'
        }}>
            Количество отзывов
        </Typography>
        <Typography sx={{
            flex: '0 0 33%', textAlign: 'center', fontSize: '1.2rem',
            fontWeight: '500',
            color: 'secondary.dark'
        }}>
            Ждут ответа
        </Typography>
    </Grid>
)

const OverviewItem = ({label, count, waiting}: IOverviewItem) => {
    return <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', p: 3}}>
        <Typography variant='h5' sx={{flex: '0 0 33%'}}>
            {label}
        </Typography>
        <Typography sx={{flex: '0 0 33%', textAlign: 'center', fontSize: '1.6rem'}}>
            {count}
        </Typography>
        <Typography sx={{flex: '0 0 33%', textAlign: 'center', fontSize: '1.6rem'}}>
            {waiting}
        </Typography>
    </Grid>
}

const Overview = () => {
    return (
        <Box sx={{backgroundColor: 'secondary.light', borderRadius: '3.2rem', padding: '2.4rem',}}>
            <Grid container
                  sx={{
                      backgroundColor: (theme) => theme.palette.background.default,
                      borderRadius: '3.2rem',
                      '& > div': {
                          height: '7rem',
                          '&:not(:last-of-type)': {borderBottom: (theme) => `solid 1px ${theme.palette.secondary.main}`}
                      }
                  }}>
                <OverviewHeader/>
                <OverviewItem label='Отзывы на магазины' count={0} waiting={0}/>
                <OverviewItem label='Отзывы на товары' count={0} waiting={0}/>
                <OverviewItem label='Вопросы к магазинам' count={0} waiting={0}/>
                <OverviewItem label='Вопросы к товарам' count={0} waiting={0}/>
            </Grid>
        </Box>
    );
};

export default Overview;