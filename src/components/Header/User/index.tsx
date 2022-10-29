import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ReactComponent as DropdownIcon } from '../../../assets/icons/arrow-down.svg?svgr';
import { useCookies } from 'react-cookie';
import { useGetUserInfoQuery } from '../../../api/user';
import ColoredAvatar from "../../common/ColoredAvatar";

const User = () => {
  const { data } = useGetUserInfoQuery();

  const [cookies, setCookies] = useCookies(['access_token']);

  function handleClick() {
    //const token = prompt('вставье токен');
    //setCookies('access_token', token);
    //window.location.reload();
  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifySelf: 'flex-end'}} onClick={handleClick}>
        <ColoredAvatar name={data?.name} picture={data?.picture_path} size={40}/>
      <IconButton size='small' sx={{ml: 3}}><DropdownIcon /></IconButton>
    </Box>
  );
};

export default User;