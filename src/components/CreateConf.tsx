import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { AppDispatch, useAppSelector } from "../redux";
import {configAnimationPage} from '../App'; 
import { setDataDefault } from "../redux/reducer";
import { CustomInput } from "./SignUp";
import { useEffect, useState, useRef } from "react";
import { useCreateOneConferenceMutation } from "../redux/conferencesApi";
import { IUserData } from "../redux/userApi";

interface IFormik {
  name: string;
  link: string;
  time: string;
  day: string;
  month: string;
  year: string;
  description: string;
}

export const CreateConf = ({user}: {user: IUserData}) => {
  const dispatch = useDispatch<AppDispatch>();
  const createdConferences = useAppSelector(state => state.user.createdConfs);
  const initialState = {
    name: '',
    link: '',
    time: '',
    day: '',
    month: '',
    year: '',
    description: ''
  } as IFormik;
  const [fileName, setFileName] = useState<string>('Select');
  const [file, setFile] = useState<string>('');
  const [createConfTrigger, {data, isLoading, isError}] = useCreateOneConferenceMutation();
  const [fileError, setFileError] = useState<Boolean>(false);
  const fileInputRef: any = useRef();

  useEffect(() => {
    if (data) {
      dispatch(setDataDefault({ini: 'createdConfs', data: [...createdConferences, data]}));
    }
  }, [data]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Conference must have a name'),
    link: Yup.string().required('Conference must have a link'),
    time: Yup.string().required('Conference must have a time'),
    day: Yup.string().required('Establish a day'),
    month: Yup.string().required('Establish a month'),
    year: Yup.string().required('Establish a year'),
    description: Yup.string().required('Conference must have a description')
    .min(10, 'Your description is too short')
  });

  const closeModal = (event: any): void => {
    if (event.target.className.split(' ').includes('create__bg')) {
      dispatch(setDataDefault({data: false, ini: 'openModal'}));
    }
  };

  const handleFile = (event: any): void => {
    const file = event.target.files['0'];
    
    if (file) {
      if (file.name.length > 20) {
        setFileName(file.name.slice(0, 20) + '...');
      } else {setFileName(file.name)};

      const reader: any = new FileReader();
      reader.addEventListener("load", () => {
        setFile(reader.result);
      }, false);

      setFileError(false);
      reader.readAsDataURL(file);
    }
  }

  return (
    <motion.div {...configAnimationPage}>
      <Box className="create__bg" onClick={(e) => {closeModal(e)}}>
        <Box className="create__modal" overflowY='auto'>
          <Text as='h3'>Create a new conference</Text>

          <Formik initialValues={initialState} onSubmit={async (values, {resetForm}) => {
            if (file.length !== 0) {
              const result = {
                name: values.name,
                time: `${values.year}-${values.month}-${values.day} ${values.time}`,
                photo: file,
                description: values.description,
                conferenceLink: values.link,
                author: {
                  name: user.name,
                  photo: user.photo,
                  description: user.job,
                  timezon: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  email: user.email
                },
                userId: user._id
              };
              await createConfTrigger(result);
              resetForm();
              fileInputRef.current.value = '';
              setFile('');
              setFileName('Select');
              setFileError(false);
            }
          }} validationSchema={validationSchema}>
            {
              ({errors, touched}) => (
                <Form>
                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="name">Name</Text>
                    <CustomInput name='name' type='text' errors={errors} touched={touched} />
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="description">Description</Text>
                    <CustomInput name='description' type='text' 
                    errors={errors} touched={touched} textarea={true} />
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="link">Conference link</Text>
                    <CustomInput name='link' type='text' errors={errors} touched={touched} />
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="time">Time (like 15:30)</Text>
                    <CustomInput name='time' type='text' errors={errors} touched={touched} />
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="day">Date (like 01.02.2022)</Text>
                    <Box justifyContent='space-between' 
                    className="create__modal-small create__modal-smallMobile">
                      <CustomInput name='day' type='text' 
                      errors={errors} touched={touched} placeholder="Day" />
                      <CustomInput name='month' type='text' 
                      errors={errors} touched={touched} placeholder="Month" />
                      <CustomInput name='year' type='text' 
                      errors={errors} touched={touched} placeholder="Year" />
                    </Box>
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="photo">Photo</Text>
                    <Flex justifyContent='space-between' className="create__modal-selectContainer">
                      <Button id='photo' className="create__modal-select"
                      border={fileError ? '2px solid rgb(218, 126, 126)' : ''}>
                        <Text as='h3'>{fileName}</Text>
                        <Input type='file' id='photo' className="create__modal-input" 
                        onChange={(e) => {handleFile(e)}} ref={fileInputRef} />
                      </Button>  
                      <Button className='create-btn' type='submit' onClick={() => {
                        if (file.length === 0) {setFileError(true)}
                        else {setFileError(false)};
                      }} disabled={isLoading}>{isLoading ? 'Loading' : 'Create'}</Button>
                    </Flex>
                    {
                      fileError ? (
                        <Text as='p' className='register__p-error'>Establish a photo</Text>
                      ) : null
                    }
                    {
                      isError ? (
                        <Text as='p' className='register__p-error'>Error, try again</Text>
                      ) : null 
                    }
                  </Box>
                </Form>
              )
            }
          </Formik>
        </Box>
      </Box>
    </motion.div>
  )
}