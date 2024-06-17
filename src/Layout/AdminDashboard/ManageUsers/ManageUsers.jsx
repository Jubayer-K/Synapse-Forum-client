import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MUIDataTable from "mui-datatables";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const {data : users =[]} = useQuery({
        queryKey : ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

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
            name: "_id",
            label: "Role",
            options: {
              customBodyRender: () => (
                <button className="btn">
                  Make Admin
                </button>
              ),
              filter: false,
            },
          },
        {
          name: "_id",
          label: "Membership",
          options: {
            customBodyRender: () => (
              <p>
                Bronze
              </p>
            ),
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

            <div> total users : {users.length}</div>
            <MUIDataTable data={users} columns={columns} options={options} />
        </>
    );
};

export default ManageUsers;