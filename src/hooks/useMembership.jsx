import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useMembership = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: membershipData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-membership", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/user/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email,
  });
  const isMember = membershipData?.membership === "gold";

  return { isMember, isLoading, isError };
};

export default useMembership;
