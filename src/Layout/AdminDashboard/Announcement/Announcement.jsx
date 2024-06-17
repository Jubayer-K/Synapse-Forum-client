import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleMakeAnnouncement = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const author_email = user.email;
    const author_image = user.photoURL;
    const author_name = user.displayName;
    const posted_time = new Date().toISOString();

    const newAnnouncement = {title ,description,author_name,author_email,author_image,posted_time}

    axiosSecure.post("/announcements", newAnnouncement).then((res) => {
      if (res.data.insertedId) {
        toast.success("Announcement Made");
        form.reset();
      }else {
        toast.error("Announcement Made Unsuccessful");
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white my-6">
        Make <span className="text-blue-500 ">Announcement</span>
      </h1>
      <div className="max-w-screen-xl mx-auto my-10">
        <form onSubmit={handleMakeAnnouncement}>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="post-title"
                  className="block text-sm font-medium leading-6  "
                >
                  Title
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

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6  "
                >
                  Description
                </label>
                <textarea
                  required
                  id="description"
                  name="description"
                  className="block w-full rounded-md border-0 py-1.5 resize-none  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
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
            <button className="btn bg-blue-400 border-none">
              Make Announcement
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Announcement;
