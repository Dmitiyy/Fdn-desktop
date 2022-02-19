import { Box, Text, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { setDataDefault } from "../redux/reducer";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { useRegistrationMutation } from "../redux/registrationApi";
import { CustomInput } from "./SignUp";
import { MobileNavigation } from './MobileNavigation';
import { BurgerMenu } from "../components/BurgerMenu";

interface IFormik {
  email: string;
  password: string;
}

export const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {email: '', password: ''} as IFormik;
  const [logInTrigger, {isLoading, isError, data}] = useRegistrationMutation();
  const [, setCookie] = useCookies(['token']);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setCookie('token', JSON.stringify(data.access_token), {
        maxAge: (60 * 60 * 24) * 30
      });  
    }
  }, [data]);

  const validationSchema = Yup.object({
    email: Yup.string().required('Enter your email'),
    password: Yup.string().required('Enter your password')
  });

  return (
    <>
      <BurgerMenu />
      <Flex w='100%' h='100vh' flexDirection='column' className="reg-center center">
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={(values) => {
          logInTrigger({...values, url: 'login'}).unwrap();
        }}>
          {
            ({errors, touched}) => (
              <Form className='register'>
                <Text as='label' htmlFor="email">Email</Text>
                <CustomInput name='email' type='text' errors={errors} touched={touched} />
                
                <Text as='label' htmlFor="password">Password</Text>
                <CustomInput name='password' type='password' errors={errors} touched={touched} />
                
                <Flex w='100%' justifyContent='space-between' alignItems='center'>
                  <Box as='button' type='submit' className={
                    isLoading ? 'loading' : ''
                  } disabled={isLoading}>{isLoading ? 'Loading' : 'Log in'}</Box>
                  <Text as='p' onClick={() => {
                    dispatch(setDataDefault({data: true, ini: 'signUpBlock'}))}
                  }>Sign up</Text>
                </Flex>
                {
                  isError ? (
                    <Text as='p' className='register__p-error' mt='5px !important'>
                      Incorrect email or password
                    </Text>
                  ) : null
                }
              </Form>
            )
          }
        </Formik>
        <Text as='p' className="register-descr">
          In your account you can create new conferences, make money, 
          meet new people and much more. So, please register
        </Text>
      </Flex>
      <MobileNavigation />
    </>
  )
}