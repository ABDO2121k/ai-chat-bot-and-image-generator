import { TypeAnimation } from 'react-type-animation';
const Typer = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat with openai',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Chat with our chatbot',
        1000,
        'Generate a photos with our photo generator ',
        1000,
        'All this is made by Mr ABDELKADER KOUAH',
        1500
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '45px', display: 'inline-block',color:'white',textShadow:'1px 1px 20px #000' }}
      repeat={Infinity}
    />
  )
}

export default Typer