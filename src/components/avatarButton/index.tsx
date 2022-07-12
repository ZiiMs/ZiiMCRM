import { Avatar, IconButton } from '@chakra-ui/react';



const AvatarButton = ({ ...props }) => {
  return <IconButton aria-label={''} {...props} as={Avatar} />;
};



export default AvatarButton;
