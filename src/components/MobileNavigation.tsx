import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import { configAnimationPage } from "../App";
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "../redux";
import { setDataDefault } from "../redux/reducer";

export const MobileNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useAppSelector(state => state.user.openModalNav);

  const handleModalOpen = (value: Boolean): void => {
    dispatch(setDataDefault({ini: 'openModalNav', data: value}));
  };

  return (
    <AnimatePresence>
      {
        isModalOpen ? (
          <motion.div {...configAnimationPage}>
            <Box className='home__nav-modal' onClick={(event: any) => {
              if (event.target.className.split(' ').includes('home__nav-modal')) {
                handleModalOpen(!isModalOpen);
              } else {handleModalOpen(false)};
            }}>
              <Link to='/'>Home</Link>
              <Link to='/profile'>Profile</Link>
            </Box>
          </motion.div>
        ) : null
      }
    </AnimatePresence>
  )
}