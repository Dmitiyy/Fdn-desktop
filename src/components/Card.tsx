import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Photo from '../images/card.png';
import Heart from '../images/heart.svg';

export const Card = () => {
  return (
    <Flex w='250px' h='290px' className="home-card" >
      <Box w='180px' h='112px' position='relative' mt='2px'>
        <Image src={Photo} alt='card' w='100%' h='100%' borderRadius='23px' />
        <Flex className="home-card-time">
          <Text as='p'>16.12.2021</Text>
          <Text as='p'>4:30pm</Text>
        </Flex>
      </Box>
      <Text as='p' fontSize='21px' fontWeight='500'>Name</Text>
      <Flex w='180px' justifyContent='space-between'>
        <Box as='button' fontSize='19px' fontWeight='700'
        w='120px' h='50px' bg='#C2D2E9' borderRadius='26px'>Open</Box>
        <Flex as='button' className="home-card-btn">
          <Image src={Heart} alt='heart' w='25px' mt='2px' />
        </Flex>
      </Flex>
    </Flex>
  )
}