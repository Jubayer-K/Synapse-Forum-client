import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostCard from '../Shared/PostCard/PostCard';
import Announcement from './Announcement/Announcement';
import Banner from './Banner/Banner';
import LoadingSkeleton from '../Shared/LoadingSkeleton/LoadingSkeleton';

const fetchPosts = async ({ queryKey }) => {
  const [, { page, sort }] = queryKey;
  const url = sort === 'popular'
    ? `${import.meta.env.VITE_API_URL}/posts/popular?page=${page}&limit=5`
    : `${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=5`;
  const response = await axios.get(url);
  return response.data;
};

const fetchTags = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/tags`);
  return response.data;
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'popular'
  const [selectedTag, setSelectedTag] = useState('');
  const topRef = useRef(null);

  const { data: postsData, isLoading: postsLoading, isError: postsError } = useQuery({
    queryKey: ['posts', { page: currentPage, sort: sortOrder }],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  const { data: tagsData, isLoading: tagsLoading, isError: tagsError } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  const posts = postsData?.posts || [];
  const totalPages = postsData?.totalPages || 0;
  const tags = tagsData || [];

  const handleButtonClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Reset to page 1 when changing sort order
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchTerm(tag);
    setCurrentPage(1); // Reset to page 1 when selecting a tag
  };

  const filteredPosts = posts.filter((post) =>
    post.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (postsLoading || tagsLoading) {
    return <LoadingSkeleton />;
  }

  if (postsError || tagsError) {
    return <div>Error loading posts or tags</div>;
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
        <div className="flex justify-center my-4">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 mx-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="latest">Sort by Latest</option>
            <option value="popular">Sort by Popularity</option>
          </select>
        </div>
        <div className="flex flex-wrap justify-center my-4">
          {tags.map((tag) => (
            <button
              key={tag._id}
              onClick={() => handleTagClick(tag.name)}
              className={`px-4 py-2 mx-1 my-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                selectedTag === tag.name ? 'bg-blue-500 text-yellow-400-600 dark:text-gray-400 ' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
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
              className={`px-4 hidden md:block py-2 mx-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
