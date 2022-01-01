import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Photo from '../images/card.png';
import Heart from '../images/heart.svg';
import { AppDispatch } from "../redux";
import { useGetOneConferenceMutation } from "../redux/conferencesApi";
import { setDataDefault } from "../redux/reducer";

interface ICard {
  id: string;
  photo: string,
  time: string,
  name: string,
}

export const Card = (cardData: ICard) => {
  const [getOneTrigger, {isLoading, isError, data}] = useGetOneConferenceMutation();
  const [iniDate] = useState<Date>(new Date(cardData.time));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isError && !isLoading && data && data.length !== 0) {
      dispatch(setDataDefault({ini: 'certainConference', data}))
      console.log(data);
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

  const renderDate = () => {
    return iniDate.toLocaleString().split(',')[0];
  }

  const openConference = (id: string): void => {
    getOneTrigger({id});
  }

  return (
    <Flex w='250px' h='290px' className="home-card" >
      <Box w='180px' h='112px' position='relative' mt='2px'>
        <Image src={Photo} alt='card' w='100%' h='100%' borderRadius='23px' />
        <Flex className="home-card-time">
          <Text as='p'>{renderDate()}</Text>
          <Text as='p'>{transformTime(iniDate)}</Text>
        </Flex>
      </Box>
      <Text as='p' fontSize='21px' fontWeight='500'>{cardData.name}</Text>
      <Flex w='180px' justifyContent='space-between'>
        <Link to='/conference'>
          <Box as='button' fontSize='19px' fontWeight='700'
          w='120px' h='50px' bg='#C2D2E9' borderRadius='26px' onClick={() => {
            openConference(cardData.id);
          }}>Open</Box>
        </Link>
        <Flex as='button' className="home-card-btn">
          <Image src={Heart} alt='heart' w='25px' mt='2px' />
        </Flex>
      </Flex>
    </Flex>
  )
}