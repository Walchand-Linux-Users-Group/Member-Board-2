import { TypeAnimation } from 'react-type-animation';
 
export default function BasicType () {
  return (
    <TypeAnimation
      sequence={[
        'Last Chance to be a part of this community!'
      ]}
      wrapper="span"
      speed={150}
      cursor={true}
      repeat={0}
      style={{ display: 'inline-block',color:'white',fontWeight:500 }}
    />
  );
};