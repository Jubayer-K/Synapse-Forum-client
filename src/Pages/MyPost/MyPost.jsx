import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";
import PostCard from "../Shared/PostCard/PostCard";

const MyPost = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        </>
    );
};

export default MyPost;