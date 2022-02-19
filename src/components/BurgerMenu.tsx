import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../redux";
import { useDispatch } from "react-redux";
import { setDataDefault } from "../redux/reducer";
import Logo from '../images/logo.png';

export const BurgerMenu = () => {
  const isModalOpen = useAppSelector(state => state.user.openModalNav);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleModalOpen = (): void => {
    dispatch(setDataDefault({ini: 'openModalNav', data: !isModalOpen}));
  };
  
  return (
    <Box className="home__navMobile">
      <Image src={Logo} alt='logo' onClick={() => {navigate('/home')}} />
      <Box onClick={handleModalOpen}><Box /><Box /><Box /></Box>
    </Box>
  )
}