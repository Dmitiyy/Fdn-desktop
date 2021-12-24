import { Box, Text, Input, Flex } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux"
import { setDataDefault } from "../redux/reducer";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from "react";
import { useRegistrationMutation } from "../redux/registrationApi";

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
      <Flex w='100%' h='100vh' flexDirection='column' className="center">
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
    </>
  )
}

interface ICustomInput {
  name: string;
  type: string;
  errors: any;
  touched: any;
}

export const CustomInput = ({name, type, errors, touched}: ICustomInput) => {
  const [field] = useField(name);
  const isFieldError: Boolean = errors[name] && touched[name];
  const classes: string = isFieldError ? 'register__input-error' : '';

  return (
    <Fragment>
      <Input id={name} type={type} {...field} className={classes} />
      <Text as='p' className='register__p-error'>{isFieldError ? errors[name] : ''}</Text>
    </Fragment>
  )
}