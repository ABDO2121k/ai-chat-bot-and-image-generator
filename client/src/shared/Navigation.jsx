import {Link} from 'react-router-dom'


const Navigation = ({to,color,bg,text,onClick}) => {
  return (
    <Link to={to} className='nav-link' style={{background:bg,color:color}} onClick={onClick} >{text}</Link>
  )
}

export default Navigation
