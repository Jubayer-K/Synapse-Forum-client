const Announcement = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
        Important <span className="text-blue-500 ">Announcement</span>
      </h1>
      <div className="flex flex-col gap-6 md:flex-row max-w-screen-2xl mx-auto">
        <div className="w-full p-8 bg-white rounded-md shadow-lg dark:bg-gray-800">
          <p className="leading-loose text-gray-500 dark:text-gray-400">
            “ Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ea
            tempora dolores qui eius pariatur odit ad voluptas iste, cum
            accusantium beatae tempore quasi nesciunt distinctio. ”
          </p>

          <div className="flex items-center mt-6 -mx-2">
            <img
              className="object-cover mx-2 rounded-full w-14 h-14"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
            />

            <div className="mx-2">
              <h1 className="font-semibold text-gray-800 dark:text-white">
                Robbert
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                CTO, Robert Consultancy
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;
