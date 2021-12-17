import { Box, Text, Input, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { setDataDefault } from "../redux/reducer";

export const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Flex w='100%' h='100vh' flexDirection='column' className="center">
        <Box as='form' w='454px' className='register'>
          <Text as='label' htmlFor="email">Email</Text>
          <Input type='text' id='email' name='email' />
          <Text as='label' htmlFor="password">Password</Text>
          <Input type='password' id='password' name='password' />
          <Flex w='100%' justifyContent='space-between' alignItems='center'>
            <Box as='button'>Log in</Box>
            <Text as='p' onClick={() => {
              dispatch(setDataDefault({ini: 'signUpBlock', data: true}));
            }}>Sign up</Text>
          </Flex>
        </Box>
        <Text as='p' className="register-descr">
          In your account you can create new conferences, make money, 
          meet new people and much more. So, please register
        </Text>
      </Flex>
    </>
  )
}