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
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Conference } from './pages/Conference';

export const configAnimationPage = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
  transition: {duration: 0.2}
}

function App() {
  const [activeLink, setActiveLink] = useState<number>(0);

  return (
    <Container maxW='1180px' mt='30px' mb='30px' className='mainContainer'>
      <Flex>
        <Box d='flex' flexDirection='column' alignItems='center'
        height='100%' className='mainNavigation'
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
        </Box>
        <Box ml='26px' w='100%' className='home__container'>
          <AnimatePresence>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/conference' element={<Conference />} />
            </Routes>
          </AnimatePresence>
        </Box>
      </Flex>
      <Flex as='footer' w='100%' h='70px' className='center footer'
      bg='#3A4E7A' borderRadius='12px' mt='50px'>
        <Text as='p' color='#fff' fontSize='18px' fontWeight='400' className='footer-text'>
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
