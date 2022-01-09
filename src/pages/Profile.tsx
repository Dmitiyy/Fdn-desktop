import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { configAnimationPage } from "../App";
import { AvailableProfile } from "../components/AvailableProfile";
import {Registration} from '../components/Registration';
import { useGetProfileDataQuery } from "../redux/userApi";
import {ReactComponent as LoadingSvg} from '../images/loading.svg';

export const Profile = () => {
  const [cookies] = useCookies(['token']);
  const [showRegistration, setShowRegistration] = useState<Boolean>(true);
  const { data, isLoading, isError } = useGetProfileDataQuery(cookies.token, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (cookies.token) {setShowRegistration(false)}
    else {setShowRegistration(true)};
  }, [cookies.token, data]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        {
          showRegistration ? (<Registration />) : isLoading ? 
          (<LoadingSvg className="profile-loading" />) : isError ? 
          (<Text as='h2'>Error, try again later</Text>) : (<AvailableProfile data={data} />)
        }
      </Box>
    </motion.div>
  )
}