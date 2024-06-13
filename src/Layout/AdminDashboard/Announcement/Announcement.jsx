import { Link } from "react-router-dom";

const Announcement = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto my-10">
            <form>
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