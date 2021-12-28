import { Fragment, useEffect, useState } from "react";
import { Box, Flex, Image, Text, Grid } from "@chakra-ui/react";
import { Card } from "../components/Card";
import MainPhoto from '../images/main.png';
import { motion } from "framer-motion"
import { configAnimationPage } from "../App";
import { useGetAllConferencesMutation } from "../redux/conferencesApi";
import LoadingSvg from '../images/loading.svg';

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

  useEffect(() => {
    getAllTrigger({page: `${page}`, limit: '8'});
    setPage(page + 1);
  }, []);
  
  useEffect(() => {
    if (data && data.length === 0) {setShowLoadBtn(false)}
    else {setShowLoadBtn(true)}

    if (data) {
      setGeneratedData(prev => [...prev, ...data]);
    }
  }, [data]);

  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Box w='100%' h='290px' bg='#3A4E7A' borderRadius='12px'>
          <Flex justifyContent='space-evenly' alignItems='center' h='100%'>
            <Box w='591px'>
              <Text as='h1' color='#fff' fontSize='50px' fontWeight='700'>
                Learn. Inspire. Achieve
              </Text>
              <Text as='p' color='#fff' fontWeight='400' fontSize='30px' mt='10px'>
                Choose your course and start the learning process
              </Text>
            </Box>
            <Image src={MainPhoto} alt='main' w='250px' />
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
          <Grid mt='40px' templateColumns='repeat(4, 250px)' gap='20px'>
            {
              generatedData ? 
              [...generatedData].map((item: IConference) => {
                return (
                  <Fragment key={item._id}>
                    <Card id={item._id} name={item.name} photo={item.photo} time={item.time} />
                  </Fragment>
                )
              }) : null
            }
          </Grid>
          {
            showLoadBtn ? (
              <Flex justifyContent='center' w='100%' mt='20px'>
                <Box as='button' className={isLoading ? 'home-load loading' : 'home-load'} 
                disabled={isLoading} onClick={() => {
                  getAllTrigger({page: `${page}`, limit: '8'});
                  setPage(page + 1);
                }}>{isLoading ? 'Loading' : isError ? 'Error, try again later' : 'Load more'}</Box>
              </Flex>
            ) : null 
          }
        </Box>
      </Box>
    </motion.div>
  )
}