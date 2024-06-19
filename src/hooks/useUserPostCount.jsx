import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useUserPostCount = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: postCount, isLoading, isError } = useQuery({
    queryKey: ["user-post-count", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/posts/count/${user.email}`);
        return res.data.count;
      }
      return 0;
    },
    enabled: !!user?.email,
  });

  return { postCount, isLoading, isError };
};

export default useUserPostCount;
