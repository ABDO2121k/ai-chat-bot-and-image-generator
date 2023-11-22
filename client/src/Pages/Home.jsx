import {Box, useMediaQuery} from '@mui/material'
import Typer from '../components/typeAnimation/Typer'
import { useTheme } from '@emotion/react'

// and5lo react type animation bax ndiro des animation l home page dialna

const Home = () => {
  const theme=useTheme()
  const isBeloMd=useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box width={'100%'} height={'100%'} flex={'flex'} mx={'auto'} mt={3}>
      <Box sx={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}}>
        <Box>
          <Typer/>
        </Box>
        <Box  width={'100%'} height={'100%'} display={'flex'} flexDirection={{md:'row',sm:'column',xs:'column'}} gap={5} mx={'auto'}>
          <img src="robot2.png" alt="robot" style={{width:'200px',margin:'auto'}} />
          <img src="openai.png" className='image-reverse rotate' alt="openai" style={{width:'150px',margin:'auto'}}/>
        </Box>
        <Box sx={{display:'flex',width:'100%',mx:'auto'}}>
          <img src="elec.jpeg" alt="chat" style={{display:'flex',margin:'auto',width:isBeloMd?'80%':'60%',borderRadius:'20px',boxShadow:'-5px -5px 20px #64f3d5',marginTop:'20px',marginBottom:'20px'}} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home