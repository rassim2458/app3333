import {  Box, Stack} from '@mui/material';
import React from 'react';
import { useTheme } from "@mui/material/styles";
import { useEffect,useRef } from 'react';

import Headerr from './Headerr';
import Footerr from './Footerr';
import Messagee from './Messagee';

const Conversationn = () => {
    const theme = useTheme();
    const messagesContainerRef = useRef(null);


    useEffect(() => {
      scrollToBottom();
    }, []); // Add an empty dependency array to ensure it runs only once when the component mounts
  
    const scrollToBottom = () => {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }, 130); // Adjust the delay as needed
    };
  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>

        {/* Chat header */}
        <Headerr />
        {/* Msg */}
        <Box  className='scrollbar' ref={messagesContainerRef} width={"100%"} sx={{flexGrow:1, height:'100%', overflowY:'scroll'}}>
        <Messagee menu={true}/>
        </Box>
        {/* Chat footer */}
       <Footerr />
    </Stack>
  )
}

export default Conversationn