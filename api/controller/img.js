import { OpenAIApi } from "openai";
import User from "../models/User.js";
import { openaiC } from "../config/openai.js";

export const generatImg = async (req, res) => {
  const { message } = req.body;
  const user = await User.findById(res.locals.jwtData.id);
  if (!user)
    return res
      .status(401)
      .json({ message: "not registered or token not functioned" });
  try {
    const chatsI = user.chatsI.map(({ role, content }) => ({ role, content }));
    chatsI.push({ content: message, role: "user" });
    await user.chatsI.push({ content: message, role: "user" });

    const config = openaiC();
    const openai = new OpenAIApi(config);
    const chatRes = await openai.createImage({
      model: "dall-e-2",
      prompt: message,
      n: 1,
      size: "1024x1024",
    });
    await user.chatsI.push({role:'assistant',content: chatRes.data.data[0].url});
    user.save();
    return res.status(200).json({role:'assistant',content: chatRes.data.data[0].url});
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const getChat = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "not registered or token not functioned" });
    return res.status(200).json({ message: "success", chats: user.chatsI });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

export const clearChat = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "not registered or token not functioned" });
    user.chatsI = [];
    user.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};
