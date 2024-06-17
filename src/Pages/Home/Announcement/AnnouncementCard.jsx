import PropTypes from "prop-types";

const AnnouncementCard = ({ announcement }) => {
  return (
    <>
      <div className="w-full p-8 bg-white rounded-md shadow-lg dark:bg-gray-800">
        <div className="mt-2">
          <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200">
            {announcement.title}
          </p>
        </div>

        <p className="text-xs my-2 font-light text-gray-600 dark:text-gray-400">
          {new Date(announcement.posted_time).toLocaleDateString()}
        </p>
        <p className="leading-loose text-gray-500 dark:text-gray-400">
          {announcement.description}
        </p>

        <div className="flex items-center mt-6 -mx-2">
          <img
            className="object-cover mx-2 rounded-full w-14 h-14"
            src={announcement.author_image}
            alt="profile"
          />

          <div className="mx-2">
            <h1 className="font-semibold text-gray-800 dark:text-white">
              {announcement.author_name}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author_image: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    posted_time: PropTypes.number.isRequired,
  }).isRequired,
};

export default AnnouncementCard;
