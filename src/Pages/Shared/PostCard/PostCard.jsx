import PropTypes from "prop-types";
import { SlLike, SlDislike } from "react-icons/sl";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);

  const {
    _id,
    post_title,
    tag,
    author_name,
    author_image,
    posted_time,
    upvote,
    downvote,
  } = post;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${_id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [_id]);

  return (
    <div className="w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {new Date(posted_time).toLocaleDateString()}
        </span>
        <span
          className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          tabIndex="0"
          role="button"
        >
          #{tag}
        </span>
      </div>

      <div className="mt-2">
        <Link to={`/post-details/${_id}`} className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
          {post_title}
        </Link>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          <div className="flex gap-1 justify-center items-center text-gray-800 dark:text-white">
            <GoCommentDiscussion /> <span>{comments.length}</span>
          </div>
          <div className="flex gap-1 justify-center items-center text-blue-400">
            <SlLike /> <span>{upvote}</span>
          </div>
          <div className="flex gap-1 justify-center items-center text-red-800">
            <SlDislike /> <span>{downvote}</span>
          </div>
        </div>

        <div className="flex items-center">
          <img
            className="object-cover w-10 h-10 mx-4 rounded-full sm:block"
            src={author_image}
            alt="avatar"
          />
          <span
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            tabIndex="0"
            role="link"
          >
            {author_name}
          </span>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    post_title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    author_image: PropTypes.string.isRequired,
    posted_time: PropTypes.string.isRequired,
    upvote: PropTypes.number.isRequired,
    downvote: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostCard;
