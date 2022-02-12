import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { configAnimationPage } from "../App";
import { useProfile } from "../hooks/useProfile";
import { useAppSelector } from "../redux";
import { useJoinConferenceMutation } from '../redux/conferencesApi';
import { useRemoveYourMutation } from "../redux/userApi";

export const Conference = () => {
  const data = useAppSelector(state => state.user.certainConference);
  const {profileData} = useProfile();
  const [joined, setJoined] = useState<Boolean>(false);
  const [joinTrigger, {data: joinedData, isLoading, isError}] = useJoinConferenceMutation();
  const [clickBtn, setClickBtn] = useState<Boolean>(false);
  const [parts, setParts] = useState<number>(+data.participants);
  const [yourConf, setYourConf] = useState<Boolean>(false);
  const [removeConference, {data: removedData, isLoading: removedLoading}] = useRemoveYourMutation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    if (joinedData && !isLoading && !isError) {setJoined(clickBtn)};
  }, [joinedData]);

  useEffect(() => {if (removedData && !removedLoading) {navigate('/')}}, [removedData]);

  useEffect(() => {
    if (profileData) {
      const isExist = profileData.conferences.some((item: any) => {
        return item._id.toString() === data._id;
      });
      setJoined(isExist);
      if (data.author.email === profileData.email) {setYourConf(true)};
    }
  }, [profileData]);

  const handleJoin = (): void => {
    if (profileData) {
      const result = {
        conferenceId: data._id,
        userId: profileData._id,
        delete: joined
      };
      joinTrigger(result);
    } else {navigate('/profile')};
  }

  const handleRemoveConference = (): void => {
    removeConference({userId: profileData._id, conferenceId: data._id});
  }
  
  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Text as='h2' className="conf-name">{data.name}</Text>  
        <Flex className="conf__info" mt='26px'>
          <Box>
            <Box className="conf__info-photo" w='600px' h='330px' bg={`url(${data.photo})`} />
            <Flex mt='29px' w='100%' flexDirection='column'>
              <Box className='conf__author' p='26px' w='100%' h='200px' bg='#fff'>
                <Text as='p' fontWeight='bold'>Author</Text>
                <Flex>
                  {/* <Box className="conf__author-img" w='148px' h='147px' bg={`url(${data.author.photo})`} /> */}
                  <Box className="conf__author-text" mt='-20px'>
                    <Text as='p'>{data.author.name}</Text>
                    {/* <Text as='p' mt='10px'>{data.author.description}</Text> */}
                    <Text as='p' mt='10px'>{data.author.timezon}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className="conf__explanation" p='26px' w='600px' h='200px' mt='29px' bg='#fff'>
                <Flex flexDirection='column' justifyContent='center' h='100%'>
                  <Text as='p'>The link will be available after joining.</Text>
                  <Text as='p' mt='15px'>
                    You can join that conference in app which author selected. 
                    In the next update it will be own conference room in “Fdn”.
                  </Text>
                  <Text as='p' mt='15px'>Please join us!</Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box className="conf__info-details" ml='23px' w='457px' h='100%'>
            <Flex>
              <Box className="conf__info-item">{data.cardDate}</Box>
              <Box className="conf__info-item" ml='7px'>{data.cardTime}</Box>  
            </Flex>     
            <Text as='p' className='conf__info-descr' mt='21px'>{data.description}</Text>
            <Text as='p' className='conf__info-participants' mt='19px'>
              Participants: <Text as='span'>{parts}</Text>
            </Text>
            {
              yourConf ? (
                <Button as='button' className='conf__info-btn' mt='23px' w='100%' 
                disabled={removedLoading} onClick={handleRemoveConference}>Delete conference</Button>
              ) : !joined ? (
                <Button as='button' className='conf__info-btn' mt='23px' w='100%' disabled={isLoading}
                onClick={() => {
                  setClickBtn(true);
                  setParts(prev => prev + 1);
                  handleJoin();
                }}>Join us</Button>
              ) : (
                 <Fragment>
                  <Button as='button' disabled={isLoading} className='conf__info-btn' 
                  mt='23px' w='100%' onClick={() => {
                    setClickBtn(false);
                    setParts(prev => prev - 1);
                    handleJoin();
                  }}>
                    Leave
                  </Button>
                  <Text as='p' className='conf__info-descr' mt='21px'>{data.conferenceLink}</Text>
                </Fragment>
              )
            }
          </Box>
        </Flex>
      </Box>
    </motion.div>
  )
}