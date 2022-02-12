import { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Box, Flex, Image, Text, Grid } from "@chakra-ui/react";
import { Card } from "../components/Card";
import MainPhoto from '../images/main.png';
import { motion, AnimatePresence } from "framer-motion";
import { configAnimationPage } from "../App";
import { useGetAllConferencesMutation } from "../redux/conferencesApi";
import LoadingSvg from '../images/loading.svg';
import { useProfile } from "../hooks/useProfile";
import Logo from '../images/logo.png';

export interface IConference {
  _id: string,
  updatedAt: string,
  createdAt: string,
  conferenceLink: string,
  description: string,
  author: object,
  photo: string,
  time: string,
  name: string,
}

export const Home = () => {
  const [getAllTrigger, {isLoading, isError, data}] = useGetAllConferencesMutation();
  const [page, setPage] = useState<number>(1);
  const [showLoadBtn, setShowLoadBtn] = useState<Boolean>(true);
  const [generatedData, setGeneratedData] = useState<Array<IConference>>([]);
  const {profileData, profileLoading} = useProfile();
  const [profileId, setProfileId] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  
  useEffect(() => {
    if (profileData) {
      setProfileId(profileData);
    }
  }, [profileData]);

  useEffect(() => {
    getAllTrigger({page: `${page}`, limit: '8'});
    setPage(page + 1);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);
  
  useEffect(() => {
    if (data && data.length === 0) {setShowLoadBtn(false)}
    else {setShowLoadBtn(true)}

    if (data) {
      setGeneratedData(prev => [...prev, ...data]);
    }
  }, [data]);

  const handleModalOpen = (): void => {setIsModalOpen(!isModalOpen)};

  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px' minH='100vh' className="home">
        <Box className="home__navMobile" onClick={handleModalOpen}>
          <Image src={Logo} alt='logo' />
          <Box><Box /><Box /><Box /></Box>
        </Box>
        <Box w='100%' h='290px' bg='#3A4E7A' borderRadius='12px' className='home__baner-container'>
          <Flex justifyContent='space-evenly' alignItems='center' h='100%' className='home__banner-box'>
            <Box w='591px' className="home__baner-text">
              <Text as='h1' color='#fff' fontSize='50px' fontWeight='700' className="home__baner-title">
                Learn. Inspire. Achieve
              </Text>
              <Text as='p' color='#fff' fontWeight='400' fontSize='30px' mt='10px' 
              className="home__baner-descr">
                Choose your course and start the learning process
              </Text>
            </Box>
            <Image src={MainPhoto} alt='main' w='250px' className="home__baner-photo" />
          </Flex>
        </Box>
        <Box mt='40px'>
          <Text as='h2' fontSize='21px' fontWeight='700'>All conferences</Text>
          {
            generatedData.length === 0 && isLoading ? (
              <Flex justifyContent='center' w='100%' mt='40px'>
                <Image src={LoadingSvg} alt='loading' w='110px' />
              </Flex>
            ) : null
          }
          <Grid mt='40px' templateColumns='repeat(4, 250px)' gap='20px' className='home__cardsContainer'>
            {
              generatedData && !profileLoading ? 
              [...generatedData].map((item: IConference) => {
                return (
                  <Fragment key={item._id}>
                    <Card id={item._id} name={item.name} link={item.conferenceLink}
                    photo={item.photo} time={item.time} profileId={profileId} />
                  </Fragment>
                )
              }) : null
            }
          </Grid>
          {
            showLoadBtn ? (
              <Flex justifyContent='center' w='100%' mt='20px'>
                <Box as='button' className={isLoading || profileLoading ? 
                'home-load loading' : 'home-load'} 
                disabled={isLoading || profileLoading} onClick={() => {
                  getAllTrigger({page: `${page}`, limit: '8'});
                  setPage(page + 1);
                }}>{isLoading || profileLoading ? 'Loading' : 
                isError ? 'Error, try again later' : 'Load more'}</Box>
              </Flex>
            ) : null 
          }
        </Box>
      </Box>
      <AnimatePresence>
        {
          isModalOpen ? (
            <motion.div {...configAnimationPage}>
              <Box className='home__nav-modal' onClick={(event: any) => {
                if (event.target.className.split(' ').includes('home__nav-modal')) {
                  handleModalOpen();
                }
              }}>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
              </Box>
            </motion.div>
          ) : null
        }
      </AnimatePresence>
    </motion.div>
  )
}