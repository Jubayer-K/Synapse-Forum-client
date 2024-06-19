import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (userId) => {
    axiosSecure.patch(`/users/admin/${userId}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "User is now an Admin",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const columns = [
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
          const userRole = tableMeta.rowData[2]; // Assuming role is the third column
          return userRole !== "admin" ? (
            <button onClick={() => handleMakeAdmin(value)} className="btn hover:bg-blue-400 hover:text-white">
              Make Admin
            </button>
          ) : (
            <p className="btn bg-green-600 border-none text-white hover:bg-green-400 ">Admin</p>
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
          return <p className="font-bold btn w-full btn-disabled" style={{ color }}>{value.toUpperCase()}</p>;
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
      <MUIDataTable data={users} columns={columns} options={options} />
    </>
  );
};

export default ManageUsers;
