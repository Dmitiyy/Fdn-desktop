import { Fragment, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { 
  Box, 
  Container, 
  Flex, 
  Image,
  Text
} from '@chakra-ui/react';
import { AnimatePresence } from "framer-motion";
import Logo from './images/logo.png';
import HomeIcon from './images/home.svg';
import ProfileIcon from './images/profile.svg';
import SearchIcon from './images/search.svg';
// import CloseIcon from './images/close.svg';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Conference } from './pages/Conference';
// const { ipcRenderer } = window.require('electron');
// require('dotenv').config();

export const configAnimationPage = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
  transition: {duration: 0.2}
}

function App() {
  const [activeLink, setActiveLink] = useState<number>(0);

  return (
    <Container maxW='1180px' mt='30px' mb='30px'>
      <Flex>
        <Box d='flex' flexDirection='column' alignItems='center'
        // height='100%'
        position='sticky' top='30px'>
          <Image src={Logo} alt='logo' />
          {
            [
              {photo: HomeIcon, path: '/', id: 1},
              {photo: ProfileIcon, path: '/profile', id: 2},
              {photo: SearchIcon, path: '/search', id: 3}
            ].map((item, i) => {
              return (
                <Fragment key={item.id}>
                  <Link to={item.path} className='home-link'>
                    <BtnNav img={item.photo} bg={i === activeLink ? '#FFFFFF': '#DFE9EE'}
                    boxShadow={i === activeLink ? '0px 10px 22px rgba(0, 0, 0, 0.2)' : ''}
                    click={() => {setActiveLink(i)}} />
                  </Link>
                </Fragment>
              )
            })
          }
          {/* <Flex flexDirection='column' justifyContent='flex-end' 
          h='calc(100vh - ((65px + 26px) * 3) - (60px * 2))' minH='90px'>
            <Box mt='26px'>
              <BtnNav img={CloseIcon} bg={'#D39696'} click={() => {
                ipcRenderer.send('btn-exit');
              }} />
            </Box>
          </Flex> */}
        </Box>
        <Box ml='26px'>
          <AnimatePresence>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/conference' element={<Conference />} />
            </Routes>
          </AnimatePresence>
        </Box>
      </Flex>
      <Flex as='footer' w='100%' h='70px' className='center'
      bg='#3A4E7A' borderRadius='12px' mt='50px'>
        <Text as='p' color='#fff' fontSize='18px' fontWeight='400'>
          © 2021 Fdn - All rights reserved
        </Text>
      </Flex>
    </Container>
  );
}

interface IBtnNav {
  img: string; 
  bg: string;
  boxShadow?: string;
  click?: Function;
}

const BtnNav = ({img, bg, boxShadow, click}: IBtnNav) => {
  return (
    <Box w='65px' minH='65px' bg={bg} boxShadow={boxShadow}
    borderRadius='12px' cursor='pointer' onClick={() => {
      if (click) {click()}
    }} transition='all .2s'
    d='flex' alignItems='center' justifyContent='center'>
      <Image src={img} alt='profile' width='25px' />
    </Box>
  )
}

export default App;
