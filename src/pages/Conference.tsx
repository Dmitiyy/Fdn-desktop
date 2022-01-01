import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { configAnimationPage } from "../App";

export const Conference = () => {
  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Text as='h2' className="conf-name">Conference name here</Text>  
        <Flex className="conf__info" mt='26px'>
          <Box className="conf__info-photo" w='600px' h='330px' />
          <Box className="conf__info-details" ml='23px' w='457px'>
            <Flex>
              <Box className="conf__info-item">12.12.2022</Box>
              <Box className="conf__info-item" ml='7px'>7:00 pm</Box>  
            </Flex>     
            <Text as='p' className='conf__info-descr' mt='21px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation
            </Text>
            <Text as='p' className='conf__info-participants' mt='19px'>
              Participants: <Text as='span'>8</Text>
            </Text>
            <Box as='button' className='conf__info-btn' mt='23px'>Join us</Box>
          </Box>
        </Flex>
        <Flex mt='29px' w='100%' flexDirection='column'>
          <Box className='conf__author' p='26px' w='437px' h='200px' bg='#fff'>
            <Flex>
              <Box className="conf__author-img" w='148px' h='147px' />
              <Box className="conf__author-text">
                <Text as='p'>Author name</Text>
                <Text as='p' mt='10px'>Web-designer</Text>
                <Text as='p' mt='10px'>America / Los Angeles</Text>
              </Box>
            </Flex>
          </Box>
          <Box className="conf__explanation" p='26px' w='617px' h='200px' mt='29px' bg='#fff'>
            <Flex flexDirection='column' justifyContent='center' h='100%'>
              <Text as='p'>The link will be available after joining.</Text>
              <Text as='p' mt='15px'>
                You can join that conference in app which author selected. 
                In the next update it will be own conference room in “Fdn”.
              </Text>
              <Text as='p' mt='15px'>Please join us!</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  )
}