import PostCard from "../Shared/PostCard/PostCard";
import Announcement from "./Announcment/Announcement";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Announcement></Announcement>
      <div>
        <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Latest <span className="text-blue-500 ">Posts</span>
        </h1>
        <div className="flex justify-center">
          <PostCard></PostCard>
        </div>
      </div>
    </>
  );
};

export default Home;
