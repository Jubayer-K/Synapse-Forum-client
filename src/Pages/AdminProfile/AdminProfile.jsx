import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const pieChartData = [
    { name: "Posts", value: stats.allPosts || 0 },
    { name: "Comments", value: stats.allComments || 0 },
    { name: "Users", value: stats.users || 0 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${pieChartData[index].name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tagName = form.tag.value.trim();

    if (tagName === "") {
      toast.error("Tag cannot be empty");
      return;
    }

    const newTag = { name: tagName };

    try {
      const response = await axiosSecure.post("/tags", newTag, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.insertedId) {
        toast.success("Tag Added Successfully");
        form.reset();
        queryClient.invalidateQueries("tags"); // Use queryClient to invalidate queries
      } else {
        toast.error("Tag Add Unsuccessful");
      }
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("An error occurred while adding the tag");
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl">
          <img
            className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src={user.photoURL}
            alt="Profile Picture"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
            {user.displayName}
          </h1>
          <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
            {user.email}
          </p>
          <p className="mt-2 text-gray-700 capitalize dark:text-gray-300 group-hover:text-gray-300">
            admin
          </p>
        </div>
        <div className="w-full flex justify-center my-8">
        <form onSubmit={handleAddTag} className="w-full max-w-sm">
          <div className="flex items-center border-b border-blue-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              id="tag"
              name="tag"
              placeholder="Add a new tag"

            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Add Tag
            </button>
          </div>
        </form>
      </div>
        <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          All <span className="text-blue-500 ">Stats</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mx-auto justify-center">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            Posts
          </h3>
          <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <p className="font-bold text-center text-gray-800 dark:text-gray-200">
              {stats.allPosts}
            </p>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            Comments
          </h3>
          <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <p className="font-bold text-center text-gray-800 dark:text-gray-200">
              {stats.allComments}
            </p>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            Users
          </h3>
          <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <p className="font-bold text-center text-gray-800 dark:text-gray-200">
              {stats.users}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full hidden md:flex justify-center my-8">
        <PieChart width={1100} height={500}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${value}`,
              `${name} (${(
                (value /
                  pieChartData.reduce((sum, entry) => sum + entry.value, 0)) *
                100
              ).toFixed(2)}%)`,
            ]}
          />
          <Legend />
        </PieChart>
      </div>

     
    </>
  );
};

export default AdminProfile;
