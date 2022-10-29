import React, {ReactChild, useState} from 'react';
import {Box, IconButton, List, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {ReactComponent as BackIcon} from '../../assets/icons/prev_l.svg?svgr';
import {ReactComponent as BurgerIcon} from '../../assets/icons/outlined/Menu-left.svg?svgr';
import {ReactComponent as HomeIcon} from '../../assets/icons/outlined/home.svg?svgr';
import {ReactComponent as StorageIcon} from '../../assets/icons/outlined/storage_box.svg?svgr';
import {ReactComponent as ShopIcon} from '../../assets/icons/outlined/shop.svg?svgr';
import {ReactComponent as PeopleIcon} from '../../assets/icons/outlined/people.svg?svgr';
import {ReactComponent as WorkBag} from '../../assets/icons/outlined/message.svg?svgr';
import {ReactComponent as DistributorIcon} from '../../assets/icons/outlined/distributor.svg?svgr';
import {ReactComponent as MyOrderIcon} from '../../assets/icons/outlined/my-order.svg?svgr';
import MenuCollapse from "./MenuCollapse";

interface IMenuLink {
    icon: ReactChild;
    label: string;
    isActive?: boolean;
}

const MenuLink = ({isActive, icon, label}: IMenuLink) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            //whiteSpace: 'nowrap',
            color: isActive ? 'primary.main' : 'text.primary',
            '& svg': {flex: '0 0 24px', width: '24px', height: '24px', color: isActive ? 'primary.main' : 'secondary.dark',
            },
            '&:hover': {
                color: 'primary.main',
                '& svg':{
                    color: 'primary.main',
                }
            },
            p: '1.6rem',
        }}>
            {icon}
            <Typography sx={{fontWeight: '600', fontSize: '1.4rem', ml: 3}}>{label}</Typography>
        </Box>
    )
}

const Navbar = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column',
            width: expanded ? '28.5rem' : '6.4rem',
            padding: '2.4rem 1.6rem 2.4rem .8rem',
            transition: 'width 0.25s ease-in-out',
            overflowX: 'hidden',
            backgroundColor: (theme) => theme.palette.background.default
        }}>
            <IconButton size='small'
                        disableRipple
                        sx={{width: '40px', height: '40px', alignSelf: 'flex-end', justifyContent: 'flex-end', '&:hover': {background: 'unset'}}}
                        onClick={() => setExpanded(!expanded)}>
                <Box>
                    {expanded ? <BackIcon/> : <BurgerIcon />}
                </Box>
            </IconButton>

            <MenuCollapse/>

            <List
                sx={{
                    width: '100%', maxWidth: 220,
                    '& .MuiTypography-root': {
                        display: expanded ? 'inline' : 'none',
                    }
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"

            >

                <NavLink to='/'>
                    {({isActive}) => (
                        <MenuLink label='Дашборд' isActive={isActive} icon={<HomeIcon/>}/>
                    )}
                </NavLink>

                <NavLink to='/storage_catalog'>
                    {({isActive}) => (
                        <MenuLink label='Склад и каталог' isActive={isActive} icon={<StorageIcon/>}/>
                    )}
                </NavLink>

                <NavLink to='/vendor_settings'>
                    {({isActive}) => (
                        <MenuLink label='Настройки магазина' isActive={isActive} icon={<ShopIcon/>}/>
                    )}
                </NavLink>

                <NavLink to='/distributor_offers'>
                    {({isActive}) => (
                        <MenuLink label='Предложения дистрибьюторов' isActive={isActive} icon={<DistributorIcon/>}/>
                    )}
                </NavLink>

                <NavLink to='/distributor_orders'>
                    {({isActive}) => (
                        <MenuLink label='Мои заказы' isActive={isActive} icon={<MyOrderIcon/>}/>
                    )}
                </NavLink>

                <NavLink to='/vendor_users'>
                    {({isActive}) => (
                        <MenuLink label='Сотрудники' isActive={isActive} icon={<PeopleIcon/>}/>
                    )}
                </NavLink>

                <NavLink to='/offers'>
                    {({isActive}) => (
                        <MenuLink label='Вопросы и отзывы' isActive={isActive} icon={<WorkBag/>}/>
                    )}
                </NavLink>
            </List>

        </Box>
    );
};

export default Navbar;