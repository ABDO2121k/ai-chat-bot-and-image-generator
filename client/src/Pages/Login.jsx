import {Box, Button, Typography} from '@mui/material'
import InputC from '../shared/InputC'
import {BiLogIn} from 'react-icons/bi'
import { useContext, useEffect } from 'react'
import { authContext } from '../context/AuthContext'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const auth=useContext(authContext)
   const navigate=useNavigate()
  const handleSubmit=async (e)=>{
        e.preventDefault()
       const formData=new FormData(e.target)
       const email=formData.get("email")
       const password=formData.get("password")
       try{
        toast.loading("signing In",{id:"login"});
        await auth?.login({email,password});
        toast.success("logged In",{id:"login"});
       }catch(err){
        console.log("error: ",err)
        toast.error("signing in failed ",{id:"login"})
       }


  }

  useEffect(()=>{
       if(auth?.currentUser){
         return navigate('/chat')
       }
  },[auth])
  return (
    <Box width={'100%'} height={'90vh'} display="flex" flex={1}>
        <Box padding={8} mt={8} display={{md:"flex",sm:"none",xs:"none"}}>
          <img src="robot.png" alt="Robot" style={{width:"400px"}} />
        </Box>
        <Box 
        display={'flex'} 
        flex={{xs:1,md:0.5}} 
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml="auto"
        mt={10}>

          <form onSubmit={handleSubmit}  style={{ 
            margin:'auto',
            padding:'30px',
            boxShadow:"10px 10px 20px #000",
            borderRadius:'10px',
            border:'none'
            }}>
               <Box display={'flex'} flexDirection={"column"} justifyContent={'center'}>
                <Typography variant='h4' textAlign={'center'} fontWeight={600} padding={2} color={'white'}>Login</Typography>
                <InputC type={'email'} name='email' label={'Email'} />
                <InputC type={'password'} name='password' label={'Password'} />
                <Button type='submit' 
                  endIcon={<BiLogIn/>}
                  sx={{
                    px:2,py:1,
                    width:'300px',
                    borderRadius:2,
                    bgcolor:'#00fffc',
                    ":hover":{
                      backgroundColor: "white",
                      color:'black'
                    }
                    }}>Login</Button>
               </Box>
            </form>
        </Box>
    </Box>
  )
}

export default Login