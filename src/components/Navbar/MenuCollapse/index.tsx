import * as React from 'react';
import List from '@mui/material/List';
import {
    Box,
    ListItemIcon as ListItemIcon,
    ListItemText as ListItemText,
    ListItemButton as ListItemButton,
    Collapse as Collapse
} from '@mui/material';
import {useGetMyShopsQuery} from "../../../api/vendors";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getSelectedShop, setSelectedShop} from "../../../store/shops";
import {useEffect} from "react";
import {ReactComponent as DownIcon} from "../../../assets/icons/arrow-down.svg?svgr";
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';

const MenuCollapse = () => {

    const {data: myShops} = useGetMyShopsQuery({page: 1, limit: 10});
    const selectedShop = useAppSelector(getSelectedShop);
    const dispatch = useAppDispatch();

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    function handleChange(e: React.MouseEvent<HTMLElement>, value: string) {
        dispatch(setSelectedShop(myShops!.data.find(shop => shop.vendor.id === value)));
    }

    useEffect(() => {
        if (!!myShops?.data?.length) {
            //select first shop
            dispatch(setSelectedShop(myShops.data[0]));
        }
    }, [myShops]);

    return (
        <List
            sx={{width: '100%', maxWidth: 220}}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {myShops && selectedShop &&
                <ListItemButton sx={{pl: 3}} onClick={handleClick}>
                    <ListItemIcon>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                mr: 1.2,
                                background: `url(${selectedShop.vendor.picturePath || placeholder})`,
                                backgroundSize: 'cover',
                                borderRadius: '.5rem'
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText primary={selectedShop?.vendor?.name ?? 'Нет магазинов'}/>
                    <Box sx={{display: 'flex', transform: `rotateX(${open ? 0 : '180deg'})`, color: 'secondary.main'}}>
                        <DownIcon/>
                    </Box>
                </ListItemButton>
            }

            <Collapse in={!open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {myShops?.data?.map(shop =>
                            <ListItemButton
                                onClick={(e) => handleChange(e, shop.vendor.id)}
                                key={shop.vendor.id}
                                sx={{pl: 3, whiteSpace: 'nowrap'}}
                            >
                                <ListItemIcon>
                                    <Box
                                        sx={{
                                            width: '24px',
                                            height: '24px',
                                            mr: 1.2,
                                            background: `url(${shop.vendor.picturePath || placeholder})`,
                                            backgroundSize: 'cover',
                                            borderRadius: '.5rem'
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText secondary={shop.vendor.name}/>
                            </ListItemButton>
                        )}
                </List>
            </Collapse>
        </List>
    );
};

export default MenuCollapse;