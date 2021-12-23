import { Box, Flex, Image, Text, Grid } from "@chakra-ui/react";
import { Card } from "../components/Card";
import MainPhoto from '../images/main.png';
import { motion } from "framer-motion"
import { configAnimationPage } from "../App";

export const Home = () => {
  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Box w='100%' h='290px' bg='#3A4E7A' borderRadius='12px'>
          <Flex justifyContent='space-evenly' alignItems='center' h='100%'>
            <Box w='591px'>
              <Text as='h1' color='#fff' fontSize='50px' fontWeight='700'>
                Learn. Inspire. Achieve
              </Text>
              <Text as='p' color='#fff' fontWeight='400' fontSize='30px' mt='10px'>
                Choose your course and start the learning process
              </Text>
            </Box>
            <Image src={MainPhoto} alt='main' w='250px' />
          </Flex>
        </Box>
        <Box mt='40px'>
          <Text as='h2' fontSize='21px' fontWeight='700'>All conferences</Text>
          <Grid mt='40px' templateColumns='repeat(4, 250px)' gap='20px'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Grid>
        </Box>
      </Box>
    </motion.div>
  )
}