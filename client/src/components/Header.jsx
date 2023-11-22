import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Logo from '../shared/Logo';
import { useContext } from 'react';
import {authContext} from '../context/AuthContext'
import Navigation from '../shared/Navigation';
import { NavLink } from 'react-router-dom';
const Header = () => {
  const auth=useContext(authContext)
  return (
    <AppBar sx={{background:'transparent',position:'static',boxShadow:'none',height:'10vh'}}>
        <Toolbar sx={{display:'flex'}}>
            <Logo/>
              <div className="ul">
                <NavLink to={'/chat'} className={'chatN'} >Chatbot</NavLink>
                <NavLink to={'/img'} className={'imgN'}>Image generator</NavLink>
              </div>
            <div>
              {auth.isLo?<>
                 <Navigation bg="#51538f" to="/" text="logout" color="white" onClick={auth.logout} style={{cursor:'pointer'}} />
              </>
              :<>
              <Navigation bg="#00fffc" to="/login" text="Login" color="black"/>
                 <Navigation bg="#51538f" to="/Signup" text="signup" color="white"/>
              </>}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header