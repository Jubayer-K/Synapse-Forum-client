
const MyProfile = () => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl">
          <img
            className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt="Amelia Anderson Profile Picture"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
            Amelia Anderson
          </h1>
          <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
            Lead Developer
          </p>
            <div>
                Badge
            </div>
        </div>
        <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Recent <span className="text-blue-500 ">Posts</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        </div>
      </div>
    </>
  );
};

export default MyProfile;
