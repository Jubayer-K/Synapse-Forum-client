import { useContext, useState } from "react";
import navlogowht from "../../../assets/logowhite.png";
import DarkMode from "../DarkMode/DarkMode";
import { Link, NavLink } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProviders";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useIsAdmin from "../../../hooks/useIsAdmin";
import useMembership from "../../../hooks/useMembership";
import { LuBadgeCheck } from "react-icons/lu";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { isAdmin } = useIsAdmin();
  const { isMember } = useMembership();


  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const logOutToast = () => toast.success(` ${user.displayName} has been logged out`);

  const handleLogOut = () => {
    logOut()
      .then(async () => {
        logOutToast();
      })
      .catch();
  };

  const navOptions = (
    <>
      <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
        <NavLink to={"/"}>
          <div className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Home
          </div>
        </NavLink>
        <NavLink to={"/membership"}>
          <div className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Membership
          </div>
        </NavLink>
        {!user && (
          <NavLink to={"/login"}>
            <div className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Join US
            </div>
          </NavLink>
        )}
      </div>
    </>
  );

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <NavLink to={"/"}>
              <img className="w-44 dark:invert" src={navlogowht} alt="" />
            </NavLink>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
            }`}
          >
            {navOptions}
            <DarkMode />
            <div className="flex items-center mt-4 lg:mt-0">
              {announcements.length > 0 && (
                <div className="indicator relative">
                  <span className="indicator-item lg:block text-center absolute bottom-5 right-2 items-center badge bg-gray-100 text-blue-400 border-none">
                    {announcements.length}
                  </span>
                  <button
                    className="hidden mx-4 text-gray-600 text-xl transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                    aria-label="show notifications"
                  >
                    <FaRegBell />
                  </button>
                </div>
              )}
              {user && (
                <div className="dropdown dropdown-start lg:dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img alt="user" src={user?.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white dark:bg-slate-500 dark:text-white rounded-box w-52"
                  >
                    <li>
                      <p className="justify-between text-gray-500 dark:text-gray-400">
                        {user?.displayName}
                        {isMember?<span className="flex items-center gap-1 text-yellow-500 "><LuBadgeCheck />Gold</span>:<span className="flex items-center gap-1 text-yellow-900 "> <LuBadgeCheck />Bronze</span>}
                      </p>
                    </li>
                    <li>
                      <Link to={"/user-dashboard/my-profile"}>
                        <p className="hover:text-blue-400">Dashboard</p>
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link to={"/admin-dashboard/admin-profile"}>
                          <p className="hover:text-blue-400">Admin Dashboard</p>
                        </Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogOut} className="hover:text-blue-400">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
