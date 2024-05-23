import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import React, { useRef,useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley,Camera, File, Image, Sticker, User } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: '12px',
      paddingBottom: '12px',
    }  
  }));

  

const ChatInput = ({ openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,}) =>{
    const [openAction, setOpenAction] = useState(false);
    return (
        <StyledInput inputRef={inputRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
            disableUnderline: true,
            startAdornment: 
            <Stack sx={{width:'max-content'}}>
                <Stack sx={{position:'relative', display: openAction ? 'inline-block' : 'none'}}>
                    
                </Stack>
                <InputAdornment>
                    <IconButton onClick={()=>{
                        setOpenAction((prev)=>!prev)
                    }}>
                        <LinkSimple/>
                    </IconButton>
                </InputAdornment>
            </Stack>
            ,
            endAdornment: <InputAdornment>
            <IconButton onClick={()=>{
                setOpenPicker(!openPicker);
            }}>
                <Smiley/>
            </IconButton>
            </InputAdornment>
        }}/>
    )
}

const Footerr = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }
  return (
    <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' :
     theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack direction='row' alignItems={'center'} spacing={3}>

        <Stack sx={{width:'100%'}}> 
             {/* Chat Input */}
            <Box sx={{ display: openPicker ? 'inline' : 'none' , zIndex:10, position:'fixed',bottom:81, right:100}}>
                <Picker  theme={theme.palette.mode}
                data={data}
                onEmojiSelect={(emoji) => {
                  handleEmojiClick(emoji.native);
                }}/>
            </Box> 
            <ChatInput inputRef={inputRef}
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}/>
        </Stack>
        
        <Box sx={{height:48, width: 48, backgroundColor:theme.palette.primary.main, 
        borderRadius: 1.5}}>
            <Stack sx={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <IconButton>
                    <PaperPlaneTilt color='#fff'/>
                </IconButton>
            </Stack>
            
        </Box>
    </Stack>
</Box>
  )
}

export default Footerr