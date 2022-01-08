import { Box, Text, Flex, Textarea, Input, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Formik, Form, } from 'formik';
import { AppDispatch } from "../redux";
import {configAnimationPage} from '../App'; 
import { setDataDefault } from "../redux/reducer";
import { CustomInput } from "./SignUp";
import { useState } from "react";

interface IFormik {
  name: string;
  link: string;
  time: string;
  day: string;
  month: string;
  year: string;
}

export const CreateConf = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialState = {
    name: '',
    link: '',
    time: '',
    day: '',
    month: '',
    year: '',
  } as IFormik;
  const [fileName, setFileName] = useState<string>('Select');
  const [descr, setDescr] = useState<string>('');
  const [file, setFile] = useState({});

  const closeModal = (event: any): void => {
    if (event.target.className.split(' ').includes('create__bg')) {
      dispatch(setDataDefault({data: false, ini: 'openModal'}));
    }
  };

  const handleFile = (event: any): void => {
    const file = event.target.files['0'];
    if (file.name.length > 20) {
      setFileName(file.name.slice(0, 20) + '...');
      setFile(file);
    } else {setFileName(file.name); setFile(file)};
  }

  return (
    <motion.div {...configAnimationPage}>
      <Box className="create__bg" onClick={(e) => {closeModal(e)}}>
        <Box className="create__modal">
          <Text as='h3'>Create a new conference</Text>

          <Formik initialValues={initialState} onSubmit={(values) => {
            console.log(values);
            console.log(descr);
            console.log(file);
          }}>
            {
              ({errors, touched}) => (
                <Form>
                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="name">Name</Text>
                    <CustomInput name='name' type='text' errors={errors} touched={touched} />
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="descr">Description</Text>
                    <Textarea id='descr' onChange={(e) => {setDescr(e.target.value)}} />
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
                    <Flex justifyContent='space-between'>
                      <CustomInput name='day' type='text' 
                      errors={errors} touched={touched} placeholder="Day" />
                      <CustomInput name='month' type='text' 
                      errors={errors} touched={touched} placeholder="Month" />
                      <CustomInput name='year' type='text' 
                      errors={errors} touched={touched} placeholder="Year" />
                    </Flex>
                  </Box>

                  <Box className="create__modal-item">
                    <Text as='label' htmlFor="photo">Photo</Text>
                    <Flex justifyContent='space-between'>
                      <Button id='photo' className="create__modal-select">
                        <Text as='h3'>{fileName}</Text>
                        <Input type='file' id='photo' className="create__modal-input" 
                        onChange={(e) => {handleFile(e)}} />
                      </Button>  
                      <Button className='create-btn' type='submit'>Create</Button>
                    </Flex>
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