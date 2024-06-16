import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";
import PostCard from "../Shared/PostCard/PostCard";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/my-post/${user.email}`,
            { withCredentials: true }
          );
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [user]);
  return (
    <>
      <div>
        <div className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl">
          <img
            className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src={user?.photoURL}
            alt="Profile Picture"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
          {user?.displayName}
          </h1>
          <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
          {user?.email}
          </p>
            <div>
                Badge
            </div>
        </div>
        <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Recent <span className="text-blue-500 ">Posts</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
