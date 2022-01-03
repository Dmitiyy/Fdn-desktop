import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from "../redux";
import HeartSelected from '../images/heart-s.png';
import Heart from '../images/heart.png';
import { useGetOneConferenceMutation } from "../redux/conferencesApi";
import { setDataDefault } from "../redux/reducer";
import { useLikeMutation } from "../redux/userApi";

interface ICard {
  id: string;
  photo: string,
  time: string,
  name: string,
  profileId: any, 
}

export const Card = (cardData: ICard) => {
  const [getOneTrigger, {isLoading, isError, data}] = useGetOneConferenceMutation();
  const [iniDate] = useState<Date>(new Date(cardData.time));
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [like, setLike] = useState<Boolean>(false);
  const [likeTrigger] = useLikeMutation();

  useEffect(() => {
    if (cardData.profileId.likedConferences) {
      const isExist = cardData.profileId.likedConferences.some(
        (item: any) => item._id === cardData.id
      );
      if (isExist) {setLike(true)}
      else {setLike(false)};
    }
  }, []);

  useEffect(() => {
    if (!isError && !isLoading && data && data.length !== 0) {
      const cardData = {
        ...data,
        cardDate: renderDate(iniDate),
        cardTime: transformTime(iniDate)
      };
      dispatch(setDataDefault({ini: 'certainConference', data: cardData}));
      navigate('/conference');
    }
  }, [data]);

  const transformTime = (date: Date) => {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const renderDate = (date: Date) => {
    return date.toLocaleString().split(',')[0];
  }

  const openConference = (id: string): void => {
    getOneTrigger({id}).unwrap();
  }

  const handleLike = () => {
    setLike(!like);
    if (cardData.profileId._id) {
      const data = {userId: cardData.profileId._id, conferenceId: cardData.id};
      likeTrigger(data);
    }
  }

  return (
    <Flex w='250px' h='290px' className="home-card" >
      <Box w='180px' h='112px' position='relative' mt='2px'>
        <Box className="home__card-photo" w='100%' h='100%' borderRadius='23px'
        backgroundImage={`url(${cardData.photo})`} />
        <Flex className="home-card-time">
          <Text as='p'>{renderDate(iniDate)}</Text>
          <Text as='p'>{transformTime(iniDate)}</Text>
        </Flex>
      </Box>
      <Text as='p' fontSize='21px' fontWeight='500'>{cardData.name}</Text>
      <Flex w='180px' justifyContent='space-between'>
        <Box as='button' fontSize='19px' fontWeight='700'
        w='120px' h='50px' bg='#C2D2E9' borderRadius='26px' onClick={() => {
          openConference(cardData.id);
        }}>Open</Box>
        <Flex as='button' className="home-card-btn" onClick={handleLike}>
          <Box w='28px' h='28px' mt='2px' pos='relative'>
            <Image src={!like ? Heart : HeartSelected}></Image>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}