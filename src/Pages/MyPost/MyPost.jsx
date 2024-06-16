import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadingSkeleton from "../Shared/LoadingSkeleton/LoadingSkeleton";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#707684",
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/posts/${_id}`
        );
        console.log("Delete response:", response.data);
        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted.",
            icon: "success",
          });
          queryClient.invalidateQueries("myPosts");
          console.log("Query invalidated");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the item.",
          icon: "error",
        });
      }
    }
  };

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryFn: fetchMyPosts,
    queryKey: ["myPosts"],
  });

  async function fetchMyPosts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-post/${user.email}`,
        { withCredentials: true }
      );
      console.log("Fetched posts:", response.data); // Log fetched posts
      return response.data;
    } catch (error) {
      throw new Error("Error fetching featured blogs");
    }
  }

  const columns = [
    {
      name: "post_title",
      label: "Title",
    },
    {
      name: "upvote",
      label: "Number of votes",
    },
    {
      name: "author_name",
      label: "Blog owner",
      options: {
        customBodyRender: (value) => <p>{value}</p>,
      },
    },
    {
      name: "_id",
      label: "View Comments",
      options: {
        customBodyRender: (value) => (
          <Link to={`/post-comments/${value}`}>
            <button className="btn">Comments</button>
          </Link>
        ),
        filter: false,
      },
    },
    {
      name: "_id",
      label: "Delete Post",
      options: {
        customBodyRender: (value) => (
          <button className="btn" onClick={() => handleDelete(value)}>
            Delete
          </button>
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

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <p>Error fetching blogs.</p>;

  return (
    <>
      <MUIDataTable data={posts} columns={columns} options={options} />
    </>
  );
};

export default MyPost;
