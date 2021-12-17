import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { configAnimationPage } from "../App";
import {Registration} from '../components/Registration';

export const Profile = () => {
  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Registration />
      </Box>
    </motion.div>
  )
}