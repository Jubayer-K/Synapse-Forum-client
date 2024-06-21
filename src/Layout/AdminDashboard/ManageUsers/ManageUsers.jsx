import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (userId) => {
    axiosSecure.patch(`/users/admin/${userId}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "User is now an Admin",
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries(["users"]);
      }
    });
  };

  const columns = [
    {
      name: "photoURL",
      label: "Profile Picture",
      options: {
        customBodyRender: (value) => (
          <img className="w-10 h-10 rounded-full mx-auto" src={value} alt="" />
        ),
        filter: false,
      },
    },
    {
      name: "name",
      label: "User Name",
    },
    {
      name: "email",
      label: "User Email",
    },
    {
      name: "role",
      label: "Role",
    },
   
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const userRole = tableMeta.rowData[3];
          return userRole !== "admin" ? (
            <button
              onClick={() => handleMakeAdmin(value)}
              className="btn hover:bg-blue-400 hover:text-white"
            >
              Make Admin
            </button>
          ) : (
            <p className="btn bg-green-600 border-none text-white hover:bg-green-400 ">
              Admin
            </p>
          );
        },
        filter: false,
      },
    },
    {
      name: "membership",
      label: "Membership",
      options: {
        customBodyRender: (value) => {
          const color = value === "gold" ? "gold" : "brown";
          return (
            <p className="font-bold btn w-full btn-disabled" style={{ color }}>
              {value.toUpperCase()}
            </p>
          );
        },
        filter: false,
      },
    },
  ];

  const options = {
    selectableRows: false,
    download: false,
    print: false,
  };

  return (
    <>
      <h1 className="text-2xl my-6 mt-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
        Manage <span className="text-blue-500 ">Users</span>
      </h1>
      <MUIDataTable data={users} columns={columns} options={options} />
    </>
  );
};

export default ManageUsers;
