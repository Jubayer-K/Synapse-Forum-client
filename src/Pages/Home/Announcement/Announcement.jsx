import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AnnouncementCard from "./AnnouncementCard";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });
  return (
    <>
      {announcements.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white my-6">
            Important <span className="text-blue-500 ">Announcement</span>
          </h1>
          <div className="flex flex-col gap-6 md:flex-row max-w-screen-2xl mx-auto">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
              ></AnnouncementCard>
            ))}
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default Announcement;
