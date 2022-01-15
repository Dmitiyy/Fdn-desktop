import { Box, Text, Flex, Image, Grid, Textarea } from "@chakra-ui/react";
import { AnimatePresence } from 'framer-motion';
import ProfileMainPhoto from '../images/profile_main.png';
import { useDispatch } from "react-redux";
import BinIcon from '../images/bin.svg';
import LogOutIcon from '../images/logout.svg';
import SendIcon from '../images/send.svg';
import { IUserData, useLikeMutation } from "../redux/userApi";
import { useRemoveYourMutation } from "../redux/userApi";
import { AppDispatch, useAppSelector } from "../redux";
import { useNavigate } from 'react-router-dom';
import { renderDate, transformTime } from "./Card";
import { setDataDefault } from "../redux/reducer";
import { Fragment, useEffect, useState } from "react";
import { CreateConf } from "./CreateConf";
import {ReactComponent as NoAvatar} from '../images/no_avatar.svg';

export const AvailableProfile = ({data}: {data: IUserData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [likeTrigger] = useLikeMutation();
  const [likedConferences, setLikedConferences] = useState<Array<any>>([]);
  const createdConferences = useAppSelector(state => state.user.createdConfs);
  const openCreateConf = useAppSelector(state => state.user.openModal);
  const [removeYourTrigger] = useRemoveYourMutation();

  useEffect(() => {setLikedConferences(data.likedConferences)}, [data.likedConferences]);
  useEffect(() => {
    dispatch(setDataDefault({ini: 'createdConfs', data: data.conferences}));
  }, [data.conferences]);

  const openConference = (conference: any): void => {
    const cardData = {
      ...conference,
      cardDate: renderDate(new Date(conference.time)),
      cardTime: transformTime(new Date(conference.time))
    };
    dispatch(setDataDefault({ini: 'certainConference', data: cardData}));
    navigate('/conference');
  }

  const removeConference = (conference: any) => {
    if (data._id) {
      const dataCard = {userId: data._id, conferenceId: conference._id};
      likeTrigger(dataCard);
      const filteredLikedConferences = likedConferences.filter(
        item => item._id !== conference._id
      );
      setLikedConferences([...filteredLikedConferences]);
    }
  }

  const handleCreateConf = () => {
    dispatch(setDataDefault({data: true, ini: 'openModal'}));
  }

  const removeFromYour = (id: string): void => {
    const result = {conferenceId: id, userId: data._id};
    removeYourTrigger(result);
    const filteredConferences = data.conferences.filter(item => item._id !== id);
    dispatch(setDataDefault({ini: 'createdConfs', data: filteredConferences}));
  }
  
  return (
    <Fragment>
      <Box d='flex'>
        <Box w='734px' mr='26px'>
          <Text as='h2' className="profile__hello" mb='5px' mt='-7px'>Hello, {data.name}</Text>
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
            {
              createdConferences.length === 0 ? (
                <Text as='p' className="profile__no-conf">
                  You don't have any conference, create frist one <Text as='span'>here</Text>
                </Text>
              ) : (
                <Grid templateColumns='repeat(3, 1fr)' gap='37px'>
                  {
                    createdConferences.map((item: any) => {
                      return (
                        <Box className='profile__card' key={item._id}>
                          <Box className='profile__card-photo' bg={`url(${item.photo})`}>
                            <Flex flexDirection='column'>
                              <Text as='p'>{renderDate(new Date(item.time))}</Text>
                              <Text as='p'>{transformTime(new Date(item.time))}</Text>
                            </Flex>
                          </Box>
                          <Text as='p'>{item.name}</Text>
                          <Box className='profile__card-btn'>
                            <Box as='button' onClick={() => {openConference(item)}}>
                              <Text as='p'>View conf</Text>
                            </Box>
                            <Box as='button' onClick={() => {removeFromYour(item._id)}}>
                              <Image src={BinIcon} alt='bin' fill='#fff' />
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                  }
                </Grid>
              )
            }
          </Box>
          <Box className="profile__liked">
            <Flex justifyContent='space-between' className="profile__liked-title">
              <Text as='h3'>Liked conferences</Text>
              {
                likedConferences.length > 3 ? (
                  <Text as='p'>View all</Text>
                ) : null
              }
            </Flex>
            {
              likedConferences.length === 0 ? (
                <Text as='p' className="profile__no-conf" mt='40px'>
                  You don't have any liked conference
                </Text>
              ) : (
                <Grid templateColumns='repeat(3, 1fr)' gap='37px' mt='40px'>
                  {
                    likedConferences.map(item => {
                      return (
                        <Box className='profile__card' key={item._id}>
                          <Box className='profile__card-photo' bg={`url(${item.photo})`}>
                            <Flex flexDirection='column'>
                              <Text as='p'>{renderDate(new Date(item.time))}</Text>
                              <Text as='p'>{transformTime(new Date(item.time))}</Text>
                            </Flex>
                          </Box>
                          <Text as='p'>{item.name}</Text>
                          <Box className='profile__card-btn'>
                            <Box as='button' onClick={() => {openConference(item)}}>
                              <Text as='p'>View conf</Text>
                            </Box>
                            <Box as='button' onClick={() => {removeConference(item)}}>
                              <Image src={BinIcon} alt='bin' fill='#fff' />
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                  }
                </Grid>
              )
            }
          </Box>
        </Box>
        <Box w='297px'>
          <Flex justifyContent='space-between'>
            <Flex className="profile__ava">
              {
                data.photo?.length !== 0 ? (
                  <Box className='profile__ava-img' />
                ) : (<NoAvatar className="no-avatar" />)
              }
              <Box>
                <Text as='h3'>{data.name}</Text>
                <Text as='p'>{data.job}</Text>
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
            <Box as='button' onClick={handleCreateConf}>Open the form</Box>
          </Box>
        </Box>
      </Box>
      <AnimatePresence>{openCreateConf ? (<CreateConf user={data} />) : null}</AnimatePresence>
    </Fragment>
  )
}