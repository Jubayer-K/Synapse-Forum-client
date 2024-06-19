import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostCard from "../Shared/PostCard/PostCard";
import Announcement from "./Announcement/Announcement";
import Banner from "./Banner/Banner";
import LoadingSkeleton from '../Shared/LoadingSkeleton/LoadingSkeleton';

const fetchPosts = async ({ queryKey }) => {
  const [, page] = queryKey;
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=${5}`);
  return response.data;
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const topRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 0;

  const handleButtonClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) => 
    post.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <>
      <div ref={topRef}>
        <Announcement />
        <Banner searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Latest <span className="text-blue-500">Posts</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={(e) => handleButtonClick(e, Math.max(currentPage - 1, 1))}
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
              onClick={(e) => handleButtonClick(e, index + 1)}
              className={`px-4 py-2 mx-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                currentPage === index + 1 ? 'bg-gray-600' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={(e) => handleButtonClick(e, Math.min(currentPage + 1, totalPages))}
            className={`px-4 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-gray-600 ${
              currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
