import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { TfiLayoutListPost } from "react-icons/tfi";
import { GoHome } from "react-icons/go";
const UserDashboard = () => {
  return (
    <>
      <div className="flex">
        <div className="flex">
          <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
                John Doe
              </h4>
              <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                john@example.com
              </p>
            </div>

            <nav>
              <ul>
                <Link className="w-full" to={"/"}>
                  <li className="flex btn items-center border-none hover:bg-gray-200">
                    <GoHome></GoHome>
                    <span className="mx-4 font-medium">Home</span>
                  </li>
                </Link>
                <Link className="w-full"  to={'my-profile'}>
                  <li className="flex btn items-center border-none hover:bg-gray-200">
                    <CgProfile></CgProfile>
                    <span className="mx-4 font-medium">My Profile</span>
                  </li>
                </Link>
                <Link className="w-full" to={"add-post"}>
                  <li className="flex btn items-center border-none hover:bg-gray-200">
                    <MdOutlineLibraryAdd></MdOutlineLibraryAdd>
                    <span className="mx-4 font-medium">Add Post</span>
                  </li>
                </Link>

                <Link className="w-full" to={"my-posts"}>
                  <li className="flex btn items-center border-none hover:bg-gray-200">
                    <TfiLayoutListPost></TfiLayoutListPost>

                    <span className="mx-4 font-medium">My Posts</span>
                  </li>
                </Link>
              </ul>
            </nav>
          </aside>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
