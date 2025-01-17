import { Link } from "react-router-dom";
import errorImg from '../../assets/illustration.svg'

const Error = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 max-w-screen-xl mx-auto">
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
              404 error
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sorry, the page you are looking for doesn&apos;t exist.
            </p>

            <Link to={"/"}>
              <button className="w-1/2 my-6 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Take me home
              </button>
            </Link>
          </div>

          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <img
              className="w-full max-w-lg lg:mx-auto"
              src={errorImg}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
