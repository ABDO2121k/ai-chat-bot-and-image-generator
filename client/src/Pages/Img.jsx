import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { authContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ChatItemI from "../components/chat/ChatI";
import axios from "axios";
import { Surprise } from "../../utils/Surprise";

const Img = () => {
  const auth = useContext(authContext);
  const inputR=useRef()
  const navigate = useNavigate();
  const [chatMessages, setM] = useState([]);
  const [Prompt,SetPrompt]=useState(null)



  const setRandom=()=>{
       const random=Surprise()
       SetPrompt(random)
  }

  useEffect(() => {
    if (auth?.isLo && auth?.currentUser) {
      toast.loading("Loading chats.....", { id: "loadChat" });
      auth
        .getChatI()
        .then((data) => {
          setM([...data.chats]);
          toast.success(" chats are loaded", { id: "loadChat" });
        })
        .catch((err) => {
          console.log("error", err);
          toast.error("Failed to load chats!!!", { id: "loadChat" });
        });
    } else {
      navigate("/login");
    }
  }, [auth]);

  const handleSubmit = async () => {
    const content = inputR.current?.value;
    inputR.current.value = "";
    SetPrompt(null)
    if (content.toLowerCase() == "clear") {
      return handleClear();
    } else {
      const newM = { role: "user", content: content };
      setM((prev) => [...prev, newM]);
      toast.loading("Loading img.....", { id: "get img" });
      try {
        const chatData = await auth.ChatI(content);
        setM((prev) => [...prev, chatData]);
        toast.success(" img loaded.....", { id: "get img" });
      } catch (err) {
        toast.error(` error while image loading.....1 ${err.message}`, {
          id: "get img",
        });
      }
    }
  };

  const handleClear = async () => {
    try {
      toast.loading(" clearing chat ", { id: "delete chat" });
      await axios.delete("/img/clearChatI");
      setM([]);
      toast.success(" chats cleared successfully ", { id: "delete chat" });
    } catch (err) {
      toast.error("failed to clear chat", { id: "delete chat" });
    }
  };

  const hanldelChange=(e)=>{
       SetPrompt(e.target.value)
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "96%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
            flex: 0.2,
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "70vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: "5px",
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.currentUser?.name[0]}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              textAlign: "center",
            }}
          >
            You are using our image generator
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 4,
              p: 3,
            }}
          >
            You can give us any prompt and our ai robot will make it as an img,
            our chatBot is made By ABDELKADER KOUAH
          </Typography>
          <Button
            sx={{
              width: "200px",
              fontWeight: "700",
              mx: "auto",
              my: "auto",
              color: "white",
              borderRadius: 3,
              bgcolor: "red",
              ":hover": {
                bgcolor: "#ff6b81",
              },
            }}
            onClick={handleClear}
          >
            Clear Conversaton
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - DALLE 2
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            borderRadius: "10px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {" "}
          {chatMessages?.map((chat, i) => (
            <ChatItemI content={chat.content} role={chat.role} key={i} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <button onClick={setRandom} > 
             random
          </button>
          <input
            type="text"
            style={{
              width: "100%",
              background: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
            value={Prompt}
            onChange={(e)=>hanldelChange(e)}
            ref={inputR}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Img;
