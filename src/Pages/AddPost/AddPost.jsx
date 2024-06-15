import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProviders";

const AddPost = () => {
  const { user } = useContext(AuthContext);

  const handleAddPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const post_title = form.title.value;
    const tag = form.tag.value;
    const post_description = form.description.value;
    const upvote = parseInt(form.upvote.value);
    const downvote = parseInt(form.downvote.value);
    const author_email = user.email;
    const author_image = user.photoURL;
    const author_name = user.displayName;
    const posted_time = new Date().toISOString();

    const newPost = {
      post_title,
      tag,
      post_description,
      author_email,
      author_image,
      author_name,
      posted_time,
      upvote,
      downvote
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        newPost,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.insertedId) {
        toast.success("Post Added Successfully");
        form.reset();
      } else {
        toast.error("Post Add Unsuccessful");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("An error occurred while adding the post");
    }
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto my-10">
        <form onSubmit={handleAddPost}>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="post-title"
                  className="block text-sm font-medium leading-6  "
                >
                  Post Title
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6  "
                >
                  Tag
                </label>
                <div className="mt-2">
                  <select
                    required
                    id="tag"
                    name="tag"
                    className="block w-full rounded-md border-0 py-1.5   shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Productivity">Productivity</option>
                    <option value="Food">Food</option>
                    <option value="Technology">Technology</option>
                    <option value="Photography">Photography</option>
                    <option value="Health">Health</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="short_description"
                  className="block text-sm font-medium leading-6  "
                >
                  Post Description
                </label>
                <textarea
                  required
                  id="description"
                  name="description"
                  className="block w-full rounded-md border-0 py-1.5 resize-none  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="post-title"
                  className="block text-sm font-medium leading-6  "
                >
                  Up vote
                </label>
                <div className="mt-2">
                  <input
                    disabled defaultValue={0}
                    type="number"
                    name="upvote"
                    id="upvote"
                    className="block text-center rounded-md border-0 py-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="post-title"
                  className="block text-sm font-medium leading-6  "
                >
                  Down vote
                </label>
                <div className="mt-2">
                  <input
                    disabled defaultValue={0}
                    type="number"
                    name="downvote"
                    id="downvote"
                    className="block text-center rounded-md border-0 py-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to={"/"}>
              <button
                type="button"
                className="text-sm font-semibold leading-6  "
              >
                Cancel
              </button>
            </Link>
            <button className="btn bg-blue-400 border-none">Add Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;
