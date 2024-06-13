import { SlLike, SlDislike } from "react-icons/sl";
import { GoCommentDiscussion } from "react-icons/go";
import { FaRegShareSquare } from "react-icons/fa";

const PostDetails = () => {
  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            Mar 10, 2019
          </span>
        </div>
        <div className="flex justify-center -mt-16 md:justify-end">
          <img
            className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
            alt="Testimonial avatar"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
          />
        </div>

        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          Post title
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!
        </p>
        <p
          className="px-3 my-4 py-2 text-sm font-bold text-blue-400 transition-colors duration-300 transform rounded"
        >
          #Tags
        </p>
        <div className="flex items-center justify-between mt-4 ">
          <div className="flex gap-4">
            <button className="flex gap-1 justify-center items-center text-gray-800 dark:text-white">
              <span>Comment</span><GoCommentDiscussion></GoCommentDiscussion> <span>5</span>
            </button>
            <button className="flex gap-1 justify-center items-center text-blue-400 hover:text-blue-700">
              <SlLike></SlLike> <span>12</span>
            </button>
            <button className="flex gap-1 justify-center items-center text-red-600 hover:text-red-800">
              <SlDislike></SlDislike>
              <span>41</span>
            </button>
            <button className="flex gap-1 justify-center items-center hover:text-gray-500">
              <FaRegShareSquare></FaRegShareSquare>
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <p className="text-lg font-medium text-blue-600 dark:text-blue-300">
            Author
          </p>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
