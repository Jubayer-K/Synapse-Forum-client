import { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetails from "../PostDetails/PostDetails";
import PostCard from "../Shared/PostCard/PostCard";
import Announcement from "./Announcement/Announcement";
import Banner from "./Banner/Banner";
import LoadingSkeleton from '../Shared/LoadingSkeleton/LoadingSkeleton';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  // Calculate the posts to be displayed on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <Banner />
      <Announcement />
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Latest <span className="text-blue-500">Posts</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-gray-600 ${
              currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-gray-600 ${
              currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <PostDetails />
    </>
  );
};

export default Home;
