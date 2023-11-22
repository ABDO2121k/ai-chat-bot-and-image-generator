import { TextField } from "@mui/material"


const InputC = ({name,label,type}) => {
  return (
    <TextField 
    margin="normal"
    InputLabelProps={{style:{color:'white'}}}
    inputProps={{style:{color:'white',width:'300px',borderRadius:10,fontSize:30}}}
    name={name} label={label} type={type} />
  )
}

export default InputC