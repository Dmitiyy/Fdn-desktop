import {Fragment} from 'react';
import { useAppSelector } from "../redux"
import { LogIn } from "./LogIn"
import { SignUp } from "./SignUp"

export const Registration = () => {
  const signUpBlock = useAppSelector(state => state.user.signUpBlock);

  return (
    <Fragment>
      {
        signUpBlock ? (<SignUp />) : (<LogIn />)
      }
    </Fragment>
  )
}