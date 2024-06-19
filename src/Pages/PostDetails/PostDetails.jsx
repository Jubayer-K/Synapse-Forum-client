import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SlLike, SlDislike } from "react-icons/sl";
import { GoCommentDiscussion } from "react-icons/go";
import { FaRegShareSquare } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { toast } from "react-toastify";
import { FacebookShareButton } from "react-share";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const post = useLoaderData();
  const {
    _id,
    post_title,
    tag,
    author_name,
    author_image,
    post_description,
    posted_time,
    upvote,
    downvote,
  } = post;

  const [upvotes, setUpvotes] = useState(upvote);
  const [downvotes, setDownvotes] = useState(downvote);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${_id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [_id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const commenterEmail = user.email;
    const commenterImage = user.photoURL;
    const commenterName = user.displayName;
    const postId = _id;

    const commentData = {
      postId,
      commenterName,
      commenterEmail,
      commenterImage,
      comment,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        commentData
      );
      setComments([...comments, data]);
      setComment("");
      toast.success("Comment Posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpvote = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/posts/${_id}/upvote`);
      setUpvotes(upvotes + 1);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/posts/${_id}/downvote`);
      setDownvotes(downvotes + 1);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = post_title;

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            {formatDateTime(posted_time)}
          </span>
        </div>
        <div className="flex justify-center -mt-16 md:justify-end">
          <img
            className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
            alt="avatar"
            src={author_image}
          />
        </div>

        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          {post_title}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
          {post_description}
        </p>
        <p className="px-3 my-4 py-2 text-sm font-bold text-blue-400 transition-colors duration-300 transform rounded">
          {tag}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4">
            <button className="flex gap-1 justify-center items-center text-gray-800 dark:text-white">
              <span>Comment</span>
              <GoCommentDiscussion /> <span>{comments.length}</span>
            </button>
            {user ? (
              <button
                className="flex gap-1 justify-center items-center text-blue-400 hover:text-blue-700"
                onClick={handleUpvote}
              >
                <SlLike /> <span>{upvotes}</span>
              </button>
            ) : (
              <button className="flex gap-1 justify-center items-center text-blue-400">
                <SlLike /> <span>{upvotes}</span>
              </button>
            )}
            {user ? (
              <button
                className="flex gap-1 justify-center items-center text-red-600 hover:text-red-800"
                onClick={handleDownvote}
              >
                <SlDislike /> <span>{downvotes}</span>
              </button>
            ) : (
              <button className="flex gap-1 justify-center items-center text-red-600">
                <SlDislike /> <span>{downvotes}</span>
              </button>
            )}

            <div className="flex gap-1 justify-center items-center">
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <div className="flex items-center gap-1">
                  <FaRegShareSquare />
                  <span>Share</span>
                </div>
              </FacebookShareButton>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <p className="text-lg font-medium text-blue-600 dark:text-blue-300">
            {author_name}
          </p>
        </div>
      </div>

      {/* comment box */}
      {user ? (
        <div className="comment-box mt-6">
          <div className="max-w-2xl mx-auto px-4">
            <form className="mb-6" onSubmit={handleComment}>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  rows="6"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Post comment
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center my-4">Login to comment</p>
      )}

      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <article
              key={comment._id}
              className="p-6 text-base bg-gray-200 rounded-lg dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={comment.commenterImage}
                      alt={comment.commenterName}
                    />
                    {comment.commenterName}
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                {comment.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
