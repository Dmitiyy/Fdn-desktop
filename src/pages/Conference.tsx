import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { configAnimationPage } from "../App";
import { useAppSelector } from "../redux";

export const Conference = () => {
  const data = useAppSelector(state => state.user.certainConference);
  
  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Text as='h2' className="conf-name">{data.name}</Text>  
        <Flex className="conf__info" mt='26px'>
          <Box>
            <Box className="conf__info-photo" w='600px' h='330px' bg={`url(${data.photo})`} />
            <Flex mt='29px' w='100%' flexDirection='column'>
              <Box className='conf__author' p='26px' w='437px' h='200px' bg='#fff'>
                <Flex>
                  <Box className="conf__author-img" w='148px' h='147px' bg={`url(${data.author.photo})`} />
                  <Box className="conf__author-text">
                    <Text as='p'>{data.author.name}</Text>
                    <Text as='p' mt='10px'>{data.author.description}</Text>
                    <Text as='p' mt='10px'>{data.author.timezon}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className="conf__explanation" p='26px' w='600px' h='200px' mt='29px' bg='#fff'>
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
          <Box className="conf__info-details" ml='23px' w='457px' h='100%'>
            <Flex>
              <Box className="conf__info-item">{data.cardDate}</Box>
              <Box className="conf__info-item" ml='7px'>{data.cardTime}</Box>  
            </Flex>     
            <Text as='p' className='conf__info-descr' mt='21px'>{data.description}</Text>
            <Text as='p' className='conf__info-participants' mt='19px'>
              Participants: <Text as='span'>{data.participants}</Text>
            </Text>
            <Box as='button' className='conf__info-btn' mt='23px'>Join us</Box>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  )
}