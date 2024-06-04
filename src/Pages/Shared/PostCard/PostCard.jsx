import { SlLike, SlDislike } from "react-icons/sl";
import { GoCommentDiscussion } from "react-icons/go";

const PostCard = () => {
  return (
    <>
      <div className="md:w-1/3 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            Mar 10, 2019
          </span>
          <a
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
            tabIndex="0"
            role="button"
          >
            #Tags
          </a>
        </div>

        <div className="mt-2">
          <a
            href="#"
            className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
            tabIndex="0"
            role="link"
          >
            Accessibility tools for designers and developers
          </a>
        </div>

        <div className="flex items-center justify-between mt-4 ">
          <div className="flex gap-4">
            <div className="flex gap-1 justify-center items-center">
              <GoCommentDiscussion></GoCommentDiscussion> <span>5</span>
            </div>
            <div className="flex gap-1 justify-center items-center text-blue-400">
              <SlLike></SlLike> <span>12</span>
            </div>
            <div className="flex gap-1 justify-center items-center text-red-800">
              <SlDislike></SlDislike>
              <span>41</span>
            </div>
          </div>

          <div className="flex items-center">
            <img
              className="object-cover w-10 h-10 mx-4 rounded-full sm:block"
              src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
              alt="avatar"
            />
            <a
              className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
              tabIndex="0"
              role="link"
            >
              Author
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
