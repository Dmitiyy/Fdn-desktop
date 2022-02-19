import { Box, Text, Input, Flex, Textarea } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux"
import { setDataDefault } from "../redux/reducer";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from "react";
import { useRegistrationMutation } from "../redux/registrationApi";
import { MobileNavigation } from './MobileNavigation';
import { BurgerMenu } from "../components/BurgerMenu";

interface IFormik {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {name: '', email: '', password: ''} as IFormik;
  const [signUpTrigger, {isLoading, isError, data}] = useRegistrationMutation();
  const [, setCookie] = useCookies(['token']);

  const validationSchema = Yup.object({
    name: Yup.string().required('Enter your name'),
    email: Yup.string().email('Must be a valid email').required('Enter your email'),
    password: Yup.string().min(8, 'Must be greater than 8').required('Enter your password')
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setCookie('token', JSON.stringify(data.access_token), {
        maxAge: (60 * 60 * 24) * 30
      });  
    }
  }, [data]);

  return (
    <>
      <BurgerMenu />
      <Flex w='100%' h='100vh' flexDirection='column' className="reg-center center">
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={(values) => {
          signUpTrigger({...values, url: 'register'}).unwrap();
        }}>
          {
            ({errors, touched}) => (
              <Form className='register'>
                <Text as='label' htmlFor="name">Name</Text>
                <CustomInput name='name' type='text' errors={errors} touched={touched} />

                <Text as='label' htmlFor="email">Email</Text>
                <CustomInput name='email' type='text' errors={errors} touched={touched} />
                
                <Text as='label' htmlFor="password">Password</Text>
                <CustomInput name='password' type='password' errors={errors} touched={touched} />
                
                <Flex w='100%' justifyContent='space-between' alignItems='center'>
                  <Box as='button' type='submit' className={
                    isLoading ? 'loading' : ''
                  } disabled={isLoading}>{isLoading ? 'Loading' : 'Sign up'}</Box>
                  <Text as='p' onClick={() => {
                    dispatch(setDataDefault({data: false, ini: 'signUpBlock'}))}
                  }>Log in</Text>
                </Flex>
                {
                  isError ? (
                    <Text as='p' className='register__p-error' mt='5px !important'>
                      User already exists
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

interface ICustomInput {
  name: string;
  type: string;
  errors: any;
  touched: any;
  placeholder?: string;
  textarea?: Boolean; 
}

export const CustomInput = ({name, type, errors, touched, placeholder, textarea}: ICustomInput) => {
  const [field] = useField(name);
  const isFieldError: Boolean = errors[name] && touched[name];
  const classes: string = isFieldError ? 'register__input-error' : '';
  
  return (
    <Fragment>
      <Box d='flex' flexDirection='column' w='100% !important'>
        {
          textarea ? (
            <Textarea id={name} {...field} className={classes} />
          ) : (
            <Input id={name} type={type} {...field} className={classes} placeholder={placeholder} />
          )
        }
        <Text as='p' className='register__p-error'>{isFieldError ? errors[name] : ''}</Text>
      </Box>
    </Fragment>
  )
}