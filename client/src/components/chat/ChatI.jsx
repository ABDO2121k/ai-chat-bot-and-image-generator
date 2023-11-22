import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";


const ChatItemI = ({ content, role, key }) => {
  const auth = useContext(authContext);
  return role == "user" ? (
    <Box
      key={key}
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
        }}
      >
        <img src={'openai.png'} alt="openai" width={"30px"} />
      </Avatar>
      <Box>
          <Typography sx={{ fontSize: "15px" }}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box
      key={key}
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        my: 2
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          color: "white",
        }}
      >
        {auth?.currentUser?.name[0]}
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "15px",display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
            <img src={content} alt="content" 
                style={{
                    margin:'auto',
                    width:'200px',
                    height:'300px',
                    padding:'30px',
                    background:'white',
                    borderRadius:'10px'
                }}
            />
        </Typography>
        
      </Box>
    </Box>
  );
};

export default ChatItemI;
