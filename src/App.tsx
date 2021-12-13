import { Fragment } from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Image,
  Text
} from '@chakra-ui/react';
import Logo from './images/logo.png';
import HomeIcon from './images/home.svg';
import ProfileIcon from './images/profile.svg';
import SearchIcon from './images/search.svg';
import CloseIcon from './images/close.svg';
import { Home } from './pages/Home';

function App() {
  return (
    <Container maxW='1180px' mt='30px' mb='30px'>
      <Flex>
        <Box d='flex' flexDirection='column' alignItems='center'
        height='100%'
        position='sticky' top='30px'>
          <Image src={Logo} alt='logo' />
          {
            [
              {photo: HomeIcon, id: 1},
              {photo: ProfileIcon, id: 2},
              {photo: SearchIcon, id: 3}
            ].map((item, i) => {
              return (
                <Fragment key={item.id}>
                  <BtnNav img={item.photo} bg={i === 0 ? '#FFFFFF': '#DFE9EE'}
                  boxShadow={i === 0 ? '0px 10px 22px rgba(0, 0, 0, 0.2)' : ''} />
                </Fragment>
              )
            })
          }
          <Flex flexDirection='column' justifyContent='flex-end' 
          h='calc(100vh - ((65px + 26px) * 3) - (60px * 2))' minH='90px'>
            <BtnNav img={CloseIcon} bg={'#D39696'} />
          </Flex>
        </Box>
        <Box ml='26px'>
          <Home />
        </Box>
      </Flex>
      <Flex as='footer' w='100%' h='70px' justifyContent='center' alignItems='center' 
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
}

const BtnNav = ({img, bg, boxShadow}: IBtnNav) => {
  return (
    <Box w='65px' minH='65px' bg={bg} boxShadow={boxShadow}
    borderRadius='12px' cursor='pointer' mt='26px'
    d='flex' alignItems='center' justifyContent='center'>
      <Image src={img} alt='profile' width='25px' />
    </Box>
  )
}

export default App;
