import { Box, Text, Flex, Image, Grid, Textarea } from "@chakra-ui/react";
import ProfileMainPhoto from '../images/profile_main.png';
import BinIcon from '../images/bin.svg';
import TestAva from '../images/test-ava.png';
import LogOutIcon from '../images/logout.svg';
import SendIcon from '../images/send.svg';

export const AvailableProfile = () => {
  return (
    <Box d='flex'>
      <Box w='734px' mr='26px'>
        <Text as='h2' className="profile__hello" mb='5px' mt='-7px'>Hello, John Swith</Text>
        <Text as='p' className="profile__hello-descr">Don't wait, start your conference right now</Text>
        <Flex className="profile__baner" h='216px'>
          <Box>
            <Text as='h2'>You have a premium account</Text>
            <Text as='p' mt='5px'>Subscription is valid for another 10 days</Text>
            <Box as='button'>Buy more here</Box>
          </Box>
          <Image src={ProfileMainPhoto} alt='profile_main' />
        </Flex>
        <Box className="profile__your">
          <Text as='h3'>Your conferences</Text>
          <Grid templateColumns='repeat(3, 1fr)' gap='37px'>
            {
              [0, 1, 2, 3, 4, 5].map(item => {
                return (
                  <Box className='profile__card' key={item}>
                    <Box className='profile__card-photo'>
                      <Flex flexDirection='column'>
                        <Text as='p'>16.12.2021</Text>
                        <Text as='p'>4:30pm</Text>
                      </Flex>
                    </Box>
                    <Text as='p'>Name here</Text>
                    <Box className='profile__card-btn'>
                      <Box as='button'><Text as='p'>View conf</Text></Box>
                      <Box as='button'><Image src={BinIcon} alt='bin' fill='#fff' /></Box>
                    </Box>
                  </Box>
                )
              })
            }
          </Grid>
        </Box>
        <Box className="profile__liked">
          <Flex justifyContent='space-between' className="profile__liked-title">
            <Text as='h3'>Liked conferences</Text>
            <Text as='p'>View all</Text>
          </Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap='37px' mt='40px'>
          {
              [0, 1, 2].map(item => {
                return (
                  <Box className='profile__card' key={item}>
                    <Box className='profile__card-photo'>
                      <Flex flexDirection='column'>
                        <Text as='p'>16.12.2021</Text>
                        <Text as='p'>4:30pm</Text>
                      </Flex>
                    </Box>
                    <Text as='p'>Name here</Text>
                    <Box className='profile__card-btn'>
                      <Box as='button'><Text as='p'>View conf</Text></Box>
                      <Box as='button'><Image src={BinIcon} alt='bin' fill='#fff' /></Box>
                    </Box>
                  </Box>
                )
              })
            }
          </Grid>
        </Box>
      </Box>
      <Box w='297px'>
        <Flex justifyContent='space-between'>
          <Flex className="profile__ava">
            <Image src={TestAva} alt='ava' />
            <Box>
              <Text as='h3'>John Smith</Text>
              <Text as='p'>Web-designer</Text>
            </Box>
          </Flex>
          <Image src={LogOutIcon} alt='logout' className="profile__logout-icon" />
        </Flex>
        <Box className="profile_support">
          <Text as='h3'>Support service</Text>
          <Box w='100%' h='100%' className="profile__chat">
            <Box className="profile__chat-messages">
              <Box className='profile__chat-dev'>
                <Text as='h3'>Dmitry</Text>
                <Box>Welcome, John!</Box>
              </Box>
              <Box className='profile__chat-me'>
                <Text as='h3'>Me</Text>
                <Box>Hello!</Box>
              </Box>
              <Box className='profile__chat-dev'>
                <Text as='h3'>Dmitry</Text>
                <Box>Welcome, John!</Box>
              </Box>
              <Box className='profile__chat-me'>
                <Text as='h3'>Me</Text>
                <Box>Hello!</Box>
              </Box>
            </Box>
            <Box className="profile__chat-text">
              <Textarea placeholder='Write your message' />
              <Image src={SendIcon} alt='send' />
            </Box>
          </Box>
        </Box>
        <Box className="profile__create">
          <Text as='h3'>Create your own conference</Text>
          <Box as='button'>Open the form</Box>
        </Box>
      </Box>
    </Box>
  )
}