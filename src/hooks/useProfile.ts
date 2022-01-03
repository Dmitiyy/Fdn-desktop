import { useCookies } from "react-cookie";
import { useGetProfileDataQuery } from "../redux/userApi";

export const useProfile = () => {
  const [cookies] = useCookies(['token']);
  const { data, isLoading, isError } = useGetProfileDataQuery(cookies.token);
  return data;
}