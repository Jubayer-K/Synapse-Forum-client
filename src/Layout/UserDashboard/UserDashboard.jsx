import { useState, useRef, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { TfiLayoutListPost } from "react-icons/tfi";
import { GoHome } from "react-icons/go";
import { AuthContext } from "../../Providers/AuthProviders";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isSidebarOpen]);
  const { user} = useContext(AuthContext);

  return (
    <>
      <div className="flex h-screen">
        <aside
          ref={sidebarRef}
          className={`flex z-50 flex-col w-64 h-full bg-white border-r dark:bg-gray-900 dark:border-gray-700 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static fixed`}
        >
          <div className="flex flex-col items-center mt-6 -mx-2">
            <img
              className="object-cover w-24 h-24 mx-2 rounded-full"
              src={user?.photoURL}
              alt="avatar"
            />
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
            {user?.displayName}
            </h4>
            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>

          <nav className="mt-10">
            <ul className="dark:text-white">
              <Link className="w-full" to="/">
                <li className="flex btn items-center border-none hover:bg-gray-200 dark:hover:text-black">
                  <GoHome />
                  <span className="mx-4 font-medium">Home</span>
                </li>
              </Link>
              <Link className="w-full" to="my-profile">
                <li className="flex btn items-center border-none hover:bg-gray-200 dark:hover:text-black">
                  <CgProfile />
                  <span className="mx-4 font-medium">My Profile</span>
                </li>
              </Link>
              <Link className="w-full" to="add-post">
                <li className="flex btn items-center border-none hover:bg-gray-200 dark:hover:text-black">
                  <MdOutlineLibraryAdd />
                  <span className="mx-4 font-medium">Add Post</span>
                </li>
              </Link>
              <Link className="w-full" to="my-posts">
                <li className="flex btn items-center border-none hover:bg-gray-200 dark:hover:text-black">
                  <TfiLayoutListPost />
                  <span className="mx-4 font-medium">My Posts</span>
                </li>
              </Link>
            </ul>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 dark:text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </header>
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
