import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from '../../components/Scrollbar';
import '../../css/global.css';
import { ChatList } from '../../data';
import ChatGroupElement from '../../components/ChatGroupeElement';
import CreateGroup from '../../sections/main/CreateGroup';
import Conversationn from '../../components/GroupeChat';
import NoChat from "../../assets/Illustration/NoChat";

import { useDispatch, useSelector } from "react-redux";


import Members from '../../components/Members';
import { fetchDirectConversations } from '../../redux/slices/conversationGroup';

const user_id = window.localStorage.getItem("user_id");

const Group = () => {
  const theme = useTheme();

  



  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  // access our store inside component
  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%' }}>
        {/* Left */}
        <Box sx={{
          
          height: '93vh',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
          width: 280,
          boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
        }}>
          <Stack p={3} spacing={2} sx={{ maxHeight: '93vh' }}>
            <Stack>
              <Typography variant='h5'>Group</Typography>
            </Stack>
            <Stack sx={{ width: '100%' }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
              </Search>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant='subtitle2' component={Link}>Create New Group</Typography>
              <IconButton onClick={() => { setOpenDialog(true) }}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack spacing={3} className='scrollbar' sx={{ flexGrow: 1, overflowY: 'scroll', height: '100%' }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={1.5}>
                  {/* chat group */}

                  {ChatList.map((el)=>{
                                return <ChatGroupElement  {...el} />
                            })}


                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        <Box sx={{
          height: '93vh', width: 'calc(1880px - 420px)',
          backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default
        }}>
          {/* Conversation */}
          <Conversationn /> 
          
        </Box>
        {/* Contact */}
        
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Group