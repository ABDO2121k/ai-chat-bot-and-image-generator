import {Configuration} from 'openai';

export const openaiC=()=>{
    const config= new Configuration({
            apiKey:process.env.OPEN_AI_SECRET,
            organization:process.env.ORG
    })
    return config
}