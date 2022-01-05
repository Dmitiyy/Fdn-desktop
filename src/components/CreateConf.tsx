import { Box, Text, Flex, Textarea, Input, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {configAnimationPage} from '../App'; 

export const CreateConf = () => {
  return (
    <motion.div {...configAnimationPage}>
      <Box className="create__bg">
        <Box className="create__modal">
          <Text as='h3'>Create a new conference</Text>

          <Text as='label' htmlFor="name">Name</Text>
          <Input id='name' type='text' />

          <Text as='label' htmlFor="descr">Description</Text>
          <Textarea id='descr' />

          <Text as='label' htmlFor="link">Conference link</Text>
          <Input id='link' type='text' />

          <Text as='label' htmlFor="time">Time (like 15:30)</Text>
          <Input id='time' type='text' />

          <Text as='label' htmlFor="date">Date (like 01.02.2022)</Text>
          <Flex justifyContent='space-between'>
            <Input id='date' type='text' placeholder="Day" />
            <Input id='date' type='text' placeholder="Month" />
            <Input id='date' type='text' placeholder="Year" />
          </Flex>

          <Text as='label' htmlFor="photo">Photo</Text>
          <Flex justifyContent='space-between'>
            <Button id='photo'>Select</Button>  
            <Box as='button' className='create-btn'>Create</Box>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  )
} 