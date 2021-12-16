import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Photo from '../images/card.png';
import Heart from '../images/heart.svg';

export const Card = () => {
  return (
    <Flex w='305px' h='360px' className="home-card" >
      <Box w='229px' h='152px' position='relative'>
        <Image src={Photo} alt='card' w='100%' h='100%' borderRadius='23px' />
        <Flex className="home-card-time">
          <Text as='p'>16.12.2021</Text>
          <Text as='p'>4:30pm</Text>
        </Flex>
      </Box>
      <Text as='p' fontSize='22px' fontWeight='500'>Name</Text>
      <Flex w='229px' justifyContent='space-between'>
        <Box as='button' fontSize='22px' fontWeight='700'
        w='166px' h='50px' bg='#C2D2E9' borderRadius='26px'>Open</Box>
        <Flex as='button' className="home-card-btn">
          <Image src={Heart} alt='heart' w='30px' mt='2px' />
        </Flex>
      </Flex>
    </Flex>
  )
}