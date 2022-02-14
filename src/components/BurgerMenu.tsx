import { Box, Image } from "@chakra-ui/react";
import { AppDispatch, useAppSelector } from "../redux";
import { useDispatch } from "react-redux";
import { setDataDefault } from "../redux/reducer";
import Logo from '../images/logo.png';

export const BurgerMenu = () => {
  const isModalOpen = useAppSelector(state => state.user.openModalNav);
  const dispatch = useDispatch<AppDispatch>();

  const handleModalOpen = (): void => {
    dispatch(setDataDefault({ini: 'openModalNav', data: !isModalOpen}));
  };
  
  return (
    <Box className="home__navMobile" onClick={handleModalOpen}>
      <Image src={Logo} alt='logo' />
      <Box><Box /><Box /><Box /></Box>
    </Box>
  )
}