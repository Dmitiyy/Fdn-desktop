import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Photo from '../images/card.png';
import Heart from '../images/heart.svg';

export const Card = () => {
  return (
    <Flex flexDirection='column' w='305px' h='360px' 
    border='18px solid #C2D2E9' borderRadius='45px'
    alignItems='center' justifyContent='space-evenly'>
      <Image src={Photo} alt='card' w='229px' h='152px' borderRadius='23px' />
      <Text as='p' fontSize='22px' fontWeight='500'>Name</Text>
      <Flex w='229px' justifyContent='space-between'>
        <Box as='button' fontSize='22px' fontWeight='700'
        w='166px' h='50px' bg='#C2D2E9' borderRadius='26px'>Open</Box>
        <Box as='button' borderRadius='100%' bg='#C2D2E9' w='50px' h='50px'
        d='flex' justifyContent='center' alignItems='center'>
          <Image src={Heart} alt='heart' w='30px' mt='2px' />
        </Box>
      </Flex>
    </Flex>
  )
}