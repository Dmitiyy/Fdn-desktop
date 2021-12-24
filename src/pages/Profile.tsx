import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { configAnimationPage } from "../App";
import { AvailableProfile } from "../components/AvailableProfile";
import {Registration} from '../components/Registration';

export const Profile = () => {
  const [cookies] = useCookies(['token']);
  const [showRegistration, setShowRegistration] = useState<Boolean>(true);

  useEffect(() => {
    if (cookies.token) {setShowRegistration(false)}
    else {setShowRegistration(true)};
  }, [cookies.token]);

  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        {showRegistration ? (<Registration />) : (<AvailableProfile />)}
      </Box>
    </motion.div>
  )
}