import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { configAnimationPage } from "../App";
import {Registration} from '../components/Registration';
import {useGetTextQuery} from '../redux/reducer';

export const Profile = () => {
  const {data, error, isLoading } = useGetTextQuery();

  useEffect(() => {
    console.log(data, error, isLoading);
  }, [data, error, isLoading])

  return (
    <motion.div {...configAnimationPage}>
      <Box w='1057px'>
        <Registration />
      </Box>
    </motion.div>
  )
}