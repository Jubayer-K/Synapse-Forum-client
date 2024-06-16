import { useLoaderData } from "react-router-dom";
import LoadingSkeleton from "../Shared/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MUIDataTable from "mui-datatables";

const PostComment = () => {

    const loaderData = useLoaderData();
    const postId = loaderData[0]?.postId;

    const { data: comments, isLoading, isError } = useQuery({
        queryFn: fetchMyComments,
        queryKey: "myComments",
      });

      async function fetchMyComments() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
          return response.data;
        } catch (error) {
          throw new Error("Error fetching featured comments");
        }
      }

      const columns = [
        {
          name: "commenterName",
          label: "Name",
        },
        {
          name: "commenterEmail",
          label: "Email",
        },
        {
          name: "comment",
          label: "Comment",
        },
      ];

      const options = {
        selectableRows: false,
        download: false,
        print: false,
      };
      if (isLoading) return <LoadingSkeleton></LoadingSkeleton>;

    return (
        <>
            {isError && <p>Error fetching blogs.</p>}
            <MUIDataTable data={comments} columns={columns} options={options} />
        </>
    );
};

export default PostComment;