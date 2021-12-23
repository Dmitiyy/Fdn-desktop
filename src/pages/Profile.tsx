import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { configAnimationPage } from "../App";
import { AvailableProfile } from "../components/AvailableProfile";
// import {Registration} from '../components/Registration';

export const Profile = () => {
  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        {/* <Registration /> */}
        <AvailableProfile />
      </Box>
    </motion.div>
  )
}