import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {FaCopy}  from 'react-icons/fa'
const extractCode = (message) => {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
};
const isCode = (str) => {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("}") ||
    str.includes("{") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
};

const ChatItem = ({ content, role, key }) => {
  const auth = useContext(authContext);
  const Code = extractCode(content);
  return role == "assistant" ? (
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
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!Code && <Typography sx={{ fontSize: "15px" }}>{content}</Typography>}
        {Code &&
          Code.length > 0 &&
          Code.map((block) => {
            return isCode(block) ? (
              <div style={{position:'relative'}}>
              <h3 style={{position:'absolute',right:'10px',top:'-10px',cursor:'pointer'}} ><FaCopy/></h3>
              <SyntaxHighlighter style={coldarkDark} width='100%' language={"javascript"} id={'text'}>
                {block}
              </SyntaxHighlighter>
              </div>
            ) : (
              <Typography sx={{ fontSize: "15px" }}>{block}</Typography>
            );
          })}
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
        {!Code && <Typography sx={{ fontSize: "15px" }}>{content}</Typography>}
        {Code &&
          Code.length > 0 &&
          Code.map((block) => {
            return isCode(block) ? (
              <SyntaxHighlighter style={coldarkDark} width='100%' language={"javascript"}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "15px" }}>{block}</Typography>
            );
          })}
      </Box>
    </Box>
  );
};

export default ChatItem;
