
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiousPublic";

const useUsers = () => {
  
    const axiosPublic = useAxiosPublic();
   
    const { data: userInfo = [], isPending: loading, refetch } = useQuery({
      queryKey: ['userInfo'],
      queryFn: async () => {
        const res = await axiosPublic.get('/user');
        return res.data;
      }
    })

    return [userInfo, loading, refetch]
  };

  export default useUsers;