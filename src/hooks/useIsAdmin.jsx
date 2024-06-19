import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useIsAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading, isError } = useQuery({
    queryKey: ["admin-user", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/admin-user/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email,
  });

  const isAdmin = roleData?.role === "admin";

  return { isAdmin, isLoading, isError };
};

export default useIsAdmin;
